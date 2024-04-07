import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const ThankYouModal = ({ show, onClose }) => {
    const router = useRouter();

    const handleHomepageRedirect = () => {
        router.push('/'); // Redirect to the homepage
        onClose(); // Close the modal
    };

    const handleCommunityRedirect = () => {
        window.open('https://linktr.ee/eosifinance', '_blank'); // Open Community in a new tab
    };

    const handleWhitepaperRedirect = () => {
        window.open('https://eosi-finance.gitbook.io/eosi-finance-whitepaper', '_blank'); // Open Whitepaper in a new tab
    };

    return show ? (
        <div className="fixed inset-0 z-50 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
            <div className="object-contain shadow-2xl shadow-violet-900 border border-violet-900 rounded-sm">
                <Image
                    src="/images/thankyou.png"
                    alt="Thank You"
                    width={600}
                    height={300}
                />
            </div>
            <div className="font-epilogue font-semibold text-[18px] text-white text-center bg-violet-900 w-[500px] py-[20px] space-x-6 cursor-pointer underline shadow-2xl shadow-violet-900 rounded-md">
                <button className='hover:text-orange-400 underline' onClick={handleHomepageRedirect}>Homepage</button>
                <button className='hover:text-orange-400 underline' onClick={handleCommunityRedirect}>Community</button>
                <button className='hover:text-orange-400 underline' onClick={handleWhitepaperRedirect}>Whitepaper</button>
            </div>
        </div>
    ) : null;
};

export default ThankYouModal;
