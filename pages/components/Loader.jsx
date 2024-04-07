import React from 'react';
import Image from 'next/image'; // Import Image component from next/image




function Loader() {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      {/* <Image src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" /> */}

      <Image
        src="/images/loader.svg"
        alt="Loader"
        className="w-[100px] h-[100px] object-contain"
        style={{ animationDuration: '10s' }}
        width={100} // Width of the image
        height={100} />


      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center" height={140}>Transaction is in progress <br /> Please wait...</p>
    </div>
  );
};

export default Loader;
