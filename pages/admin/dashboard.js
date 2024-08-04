import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import LogoutButton from '../components/LogoutButton';
import { useRouter } from 'next/router';

export default function Dashboard() {
    const [codes, setCodes] = useState([]);
    const [loading, setLoading] = useState(false); // State for loading spinner
    const router = useRouter();

    useEffect(() => {
        const fetchCodes = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('referral_codes')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching codes:', error);
            } else {
                setCodes(data);
            }
            setLoading(false);
        };

        fetchCodes();
    }, []);

    const generateRandomCode = () => {
        return Math.random().toString(36).substring(2, 12).toUpperCase();
    };

    const handleAddCode = async () => {
        setLoading(true); // Start loading spinner
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
        setLoading(false); // Stop loading spinner
    };

    const handleDeleteCode = async (id) => {
        setLoading(true); // Start loading spinner
        const { error } = await supabase
            .from('referral_codes')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting code');
        } else {
            setCodes(codes.filter((code) => code.id !== id));
        }
        setLoading(false); // Stop loading spinner
    };

    return (
        <div className="min-h-screen bg-black p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <LogoutButton />
            </div>

            <div className="mb-4">
                <button 
                    onClick={handleAddCode} 
                    className={`bg-blue-500 text-white p-2 rounded ${loading ? 'cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? (
                        <svg 
                            className="animate-spin h-5 w-5 mr-2 inline" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24"
                        >
                            <circle 
                                className="opacity-25" 
                                cx="12" 
                                cy="12" 
                                r="10" 
                                stroke="currentColor" 
                                strokeWidth="4"
                            ></circle>
                            <path 
                                className="opacity-75" 
                                fill="currentColor" 
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 20.982A10.935 10.935 0 010 12H2c0 4.708 3.262 8.682 7.558 9.736l-2.227-3.754A8.933 8.933 0 014 12H2c0 5.034 3.292 9.258 7.758 10.624l-2.227-3.755A9.037 9.037 0 014 12z"
                            ></path>
                        </svg>
                    ) : (
                        'Generate New Code'
                    )}
                </button>
            </div>

            <div className="bg-white p-4 rounded shadow text-gray-400 flex-1">
                <h2 className="text-xl mb-4 text-gray-400">Referral Codes</h2>
                <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
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
        </div>
    );
}
