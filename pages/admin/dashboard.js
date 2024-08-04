import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import LogoutButton from '../components/LogoutButton';
import { useRouter } from 'next/router';

export default function Dashboard() {
    const [codes, setCodes] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchCodes = async () => {
            const { data, error } = await supabase
                .from('referral_codes')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching codes:', error);
            } else {
                setCodes(data);
            }
        };

        fetchCodes();
    }, []);

    const generateRandomCode = () => {
        return Math.random().toString(36).substring(2, 12).toUpperCase();
    };

    const handleAddCode = async () => {
        const code = generateRandomCode();
        const { data, error } = await supabase
            .from('referral_codes')
            .insert([{ code }])
            .select();  // Fetch the inserted record

        if (error) {
            alert('Error adding code');
        } else {
            setCodes([...codes, data[0]]); // Add the new code to the list with its ID
        }
    };

    const handleDeleteCode = async (id) => {
        const { error } = await supabase
            .from('referral_codes')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting code');
        } else {
            setCodes(codes.filter((code) => code.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-black p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <LogoutButton />
            </div>

            <div className="mb-4">
                <button onClick={handleAddCode} className="bg-blue-500 text-white p-2 rounded">
                    Generate New Code
                </button>
            </div>

            <div className="bg-white p-4 rounded shadow text-gray-400">
                <h2 className="text-xl mb-4 text-gray-400">Referral Codes</h2>
                <ul>
                    {codes.map((code) => (
                        <li key={code.id} className="mb-2 p-2 border flex justify-between items-center">
                            <span>{code.code}</span>
                            <div>
                                {code.is_used ? (
                                    <>
                                        <button className="bg-gray-500 text-white p-1 rounded cursor-not-allowed">
                                            USED
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCode(code.id)}
                                            className="bg-red-500 text-white p-1 ml-4 rounded"
                                        >
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleDeleteCode(code.id)}
                                        className="bg-red-500 text-white p-1 ml-4 rounded"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
