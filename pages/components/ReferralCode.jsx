import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

const ReferralCode = () => {
    const [referralCode, setReferralCode] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for button loading

    const handleReferralCodeChange = async (event) => {
        const code = event.target.value.trim();
        setReferralCode(code);

        if (code.length === 10) {
            try {
                const { data, error } = await supabase
                    .from('referral_codes')
                    .select('*')
                    .eq('code', code)
                    .eq('is_used', false);

                if (error) {
                    console.error('Error fetching code:', error);
                    setIsValid(false);
                    return;
                }

                if (data && data.length > 0) {
                    setIsValid(true);
                } else {
                    setIsValid(false);
                }
            } catch (err) {
                console.error('Error in handleReferralCodeChange:', err);
                setIsValid(false);
            }
        } else {
            setIsValid(false);
        }
    };

    const handleReferralSubmit = async () => {
        if (isValid) {
            setIsSubmitting(true); // Start loading spinner
            try {
                const { error } = await supabase
                    .from('referral_codes')
                    .update({ is_used: true })
                    .eq('code', referralCode);

                if (error) {
                    console.error('Error updating code:', error);
                    toast.error('There was an error submitting the referral code.');
                } else {
                    // Send email to email@email.com
                    await fetch('/api/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            to: 'eosi@tutanota.com',
                            subject: 'Referral Code Submitted',
                            text: `A referral code has been submitted: ${referralCode}`,
                        }),
                    });

                    // Show toast notification with custom duration and close button
                    toast.success('Your code is valid. Go ahead and purchase EOSI tokens to secure your spot on the airdrop whitelist. Exciting times ahead!', {
                        duration: 10000, // 10 seconds
                        position: 'top-center',
                    });

                    // Reset code after successful submission
                    setReferralCode('');
                    setIsValid(false);
                }
            } catch (err) {
                console.error('Error in handleReferralSubmit:', err);
                toast.error('There was an error submitting the referral code.');
            } finally {
                setIsSubmitting(false); // Stop loading spinner
            }
        }
    };

    return (
        <div className="referral-code-container flex flex-col items-center gap-2 bg-gray-800 p-4 rounded-lg shadow-md">
            <Toaster />
            <input
                type="text"
                placeholder="Enter Referral Code"
                value={referralCode}
                onChange={handleReferralCodeChange}
                className="p-2 w-full border border-gray-600 rounded text-gray-800 outline-none"
            />
            <button
                onClick={handleReferralSubmit}
                className={`p-2 rounded w-full flex items-center justify-center ${isValid ? 'bg-gradient-to-r from-green-400 from-10% to-yellow-300 to-90% text-black border border-none' : 'bg-gray-500 cursor-not-allowed'}`}
                disabled={!isValid || isSubmitting}
            >
                {isSubmitting ? (
                    <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
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
                    'Submit Referral Code'
                )}
            </button>
        </div>
    );
};

export default ReferralCode;
