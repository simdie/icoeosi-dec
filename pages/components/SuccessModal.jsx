import React from 'react';
import Image from 'next/image';

const SuccessModal = ({ show }) => {
    return show ? (
        <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
            <div className=" object-contain ">
                <Image
                    src="/images/success.svg"
                    alt="Thank You"
                    className='border rounded-3xl'
                    width={400}
                    height={400}
                />
            </div>
            {/* <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center" height={140}>Thank you for buying our token</p> */}
        </div>
    ) : null;
};

export default SuccessModal;
