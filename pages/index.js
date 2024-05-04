import React, { useState, useEffect } from 'react';
import { ConnectWallet, useAddress, useContract } from "@thirdweb-dev/react";
import Image from "next/image";
import Header from "./components/Header";
import Link from "next/link";
import Carousel from "./components/Carousel";
import { ethers } from 'ethers';
import Loader from './components/Loader';
import SuccessModal from './components/SuccessModal';
import ThankYouModal from './components/ThankYouModal';

export default function Home() {
  const handleCloseThankYouModal = () => {
    setShowThankYouModal(false);
  };

  const handleShowThankYouModal = () => {
    setShowThankYouModal(true);
  };

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [state, setState] = useState({ pId: 0 });

  const address = useAddress();
  const { contract } = useContract('0xdd849CB140031B57000dafB807278a5da7757D04');

  useEffect(() => {
    if (showSuccessModal) {
      setTimeout(() => setShowSuccessModal(false), 3000); // Close success modal after 3 seconds
    }
  }, [showSuccessModal]);

  useEffect(() => {
    setInputValue('');
  }, [address]); // Reset input value when address changes (i.e., when wallet is disconnected)

  const handleInputChange = (event) => {
    let value = event.target.value;
    if (value.length > 8) {
      value = value.slice(0, 8);
    }
    value = value.replace(/[^0-9.]/g, '');
    setInputValue(value);
    setAmount(value); // Update the amount state
  };



  const calculateNumber = () => {
    if (!inputValue) return 0;
    return parseFloat(inputValue) * 10;
  };

  const calculateDisplayedAmount = () => {
    if (!inputValue) return 0;
    return parseFloat(inputValue) * 10;
  };

  const isAbove500 = () => {
    return parseFloat(inputValue) >= 500;
  };

  const donate = async (pId, amount) => {
    const data = await contract.call('buyEosiToken', [pId], { value: ethers.utils.parseEther(amount) });
    return data;
  }

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0 || parseFloat(amount) < 100) {
      alert('Please input a deposit amount of at least 100');
      return;
    }

    setIsLoading(true);

    try {
      await donate(state.pId, amount);
      setIsLoading(false);
      setShowSuccessModal(true);
      setTimeout(() => setShowThankYouModal(true), 3000); // Show thank you modal after 3 seconds
    } catch (error) {
      setIsLoading(false);
      console.log(error); // handle the error
    }
  };

  return (
    <>
      <div className=" overflow-y-auto bg-cover h-screen flex flex-col  text-white relative  " style={{ backgroundImage: "url('/images/background.svg')" }}>
        <div className="absolute inset-0">
          <Header />

          {isLoading && <Loader />}

          {/* Success Modal */}
          <SuccessModal show={showSuccessModal} />

          {/* Thank You Modal */}
          <ThankYouModal show={showThankYouModal} onClose={handleCloseThankYouModal} />

          <div className="flex flex-col items-center sm:items-start justify-center gap-5 mb-6 mx-[24px] sm:mx-[60px]  ">
            <p className="font-semibold text-3xl text-center sm:text-start sm:w-2/3 sm:text-2xl">Welcome to the exclusive EOSI Finance Private Token Sale! 🚀</p>
            <p className="font-inter text-sm text-center sm:text-start sm:w-2/3">Are you ready to be part of the next big AI revolution in decentralized Proprietary Trading Sector? EOSI Finance utility token <span className="text-orange-500 font-semibold">$EOSIF</span> is your golden ticket to an AI powered world where your assets work smarter, not harder. Our cutting-edge platform is the secret ingredient to spicing up your crypto investment portfolio with a dash of blockchain innovation.</p>
            <p className="hidden sm:block font-semibold text-sm text-center"> <span className="text-yellow-500 font-semibold">Why join</span>   <span className="text-purple-300 font-semibold">the EOSI Token</span>  <span className="text-green-500 font-semibold">Sale?</span></p>


            <div className="hidden sm:block p-1 mx-[20px]">
              <ul className="list-disc">
                <li className="">Flavourful Returns: Savour the potential for rich rewards.</li>
                <li className="">Exclusive Access: Secure your spot in the inner circle.</li>
                <li>Trusted Security: Invest with confidence in our robust platform.</li>
              </ul>
            </div>
            <p className="font-semibold text-sm text-center">Be a part of the financial evolution. Invest in  <span className="text-orange-500 font-semibold">$EOSIF</span> today ! 🌟</p>
          </div>
          <div className="flex flex-col sm:flex-row ">
            <div className=" p-4 flex items-center justify-center mx-12 mt-2 rounded-full bg-gradient-to-r from-green-400 from-10%  to-yellow-300 to-90% text-black border border-none cursor-pointer hover:to-purple-400 sm:w-[280px] ">
              <p className="text-center font-semibold sm:text-sm">READY? DIVE IN CRYPTO DEGENS</p>
            </div>
            <div className=" p-4 flex items-center justify-center mx-24 sm:mx-0 mt-5 sm:mt-2 rounded-full  text-white font-semibold  border-[2px] bg-black border-green-400 cursor-pointer hover:bg-transparent sm:w-[280px] ">
              <p className="text-base"><a href="https://eosi-finance.gitbook.io/eosi-finance-whitepaper/how-to-buy-eosif-during-private-sale" target="_blank" rel="noopener noreferrer" className=" text-white hover:text-white sm:text-sm">HOW TO BUY ?</a></p>
            </div>
          </div>
          <div className="hidden sm:flex border-[1px] border-zinc-500 flex-row items-center justify-between sm:w-[600px] md:w-[600px] lg:w-[800px] py-[20px] px-[50px] gap-8 mx-[50px] rounded-xl text-sm mt-10 shadow-purple2">
            <div>
              <p className="text-center">$0.10</p>
              <p>Private Sale Price</p>
            </div>
            <div>
              <p className="text-center">$0.60</p>
              <p>Public Sale Price</p>
            </div>
            <div>
              <p className="text-center">$0.95</p>
              <p>Listing Price</p>
            </div>
          </div>
          <div className="bg-black ">
            <div className="PaymentCard flex flex-col rounded-3xl justify-center border-gray-500 h-3/6 mt-[40px] sm:mt-[100px] mx-auto sm:w-[470px] p-[40px] border-[1px] shadow-purple">
              <div className="input-container flex items-center justify-between bg-black h-[70px] rounded-lg mb-3 border-[1px] border-gray-500">
                <input
                  type="number"
                  placeholder="0.00"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="placeholder-white bg-transparent border-none outline-none px-4 py-2 text-white text-lg w-full"
                  style={{ width: 'calc(100% - 100px)' }} // Adjust width as needed
                />
                <div>
                  <Image
                    src="/images/matic.png"
                    alt="Eosi Finance"
                    width={110}
                    height={2}
                    color="white"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center h-1/3 gap-2 mb-3">
                <p className="text-md">You get</p>
                <div className="flex items-center gap-[30px]">
                  <div>
                    <Image
                      src="/images/eosiEye.svg"
                      alt="Eosi Finance"
                      width={35}
                      height={25}
                    />
                  </div>
                  <div className="text-4xl font-light">{inputValue ? parseFloat(inputValue) * 10 : 0} <span className='text-sm pl-2'>Token</span> </div>
                  {/* Use calculateDisplayedAmount */}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 h-1/3">
                {address && (
                  <button className="py-[20px] border-[1px] w-[100%] rounded-xl text-xl bg-[#11b622]" onClick={handleDonate}> Buy Token </button>
                )}
                <ConnectWallet
                  style={{ width: '100%', height: '70px' }}
                />
              </div>
            </div>
            <div className=" h-40 mt-28 sm:mt-30   mx-[24px]">
              <p className="font-semibold text-3xl text-center pb-8  sm:pb-16">We are known, EOSI Finance partnerships continue to Soar 🚀</p>
            </div>
            <div className=" ">
              <Carousel />
            </div>
            <div className="flex flex-col lg:flex-row mt-10 sm:mx-[50px]">
              <div className={`flex items-center justify-center  p-[80px] text-center mt-10 border-none rounded-3xl shadow-purple text-2xl hover:shadow-red mx-[24px] `}>
                <div>
                  <p className="text-green-500">$0.10</p>
                  <p>Private Sale price</p>
                  <p className="pt-4 text-base">🚀 Get in early and ride the wave to maximum gains! 💰</p>
                </div>
              </div>
              <div className={`flex items-center justify-center  p-[80px] text-center mt-10 border-none rounded-3xl shadow-purple text-2xl hover:shadow-red mx-[24px] `}>
                <div>
                  <p className="text-yellow-300">$0.60</p>
                  <p>Public Sale price</p>
                  <p className="pt-4 text-base">Or lock in your position  here before the big exchange listing! </p>
                </div>
              </div>
              <div className={`flex items-center justify-center  p-[80px] text-center mt-10 border-none rounded-3xl shadow-purple text-2xl hover:shadow-red mx-[24px] `}>
                <div>
                  <p className="text-green-300">$0.95</p>
                  <p >Listing price</p>
                  <p className="pt-4 text-base">Benefit from liquidity and market exposure as the token gains.</p>
                </div>
              </div>
            </div>
            <div className=" mt-20 mx-[24px] sm:mx-[50px] bottom-0 left-0 right-0 p-12 sm:p-20 flex flex-col  rounded-xl justify-center bg-gradient-to-r from-green-400 via-yellow-300 to-purple-400 text-black border-none cursor-pointer hover:to-purple-400">
              <p className="text-2xl sm:text-5xl font-semibold pb-10 text-preserve">Preserving Token Stability</p>
              <p className="text-lg sm:text-2xl">
                EOSI Finance is committed to preserving the stability of the EOSIF token through a comprehensive strategy that leverages its utility and demand. Key stability mechanisms include. <span>
                  <a href="https://eosi-finance.gitbook.io/eosi-finance-whitepaper/eosif-token" target="_blank" rel="noopener noreferrer" className="underline text-black hover:text-green-900"> Learn more about EOSIF token</a>
                </span>
              </p>
            </div>
            <div className="flex mt-20 pb-10 mx-[24px] sm:mx-[50px] flex-col items-start  gap-5 ">
              <p className=" text-LG text-center text-green-400 font-semibold">CONNECT WITH US</p>
              <p className="font-inter text-sm text-center"></p>
              <a href="https://linktr.ee/eosifinance" target="_blank" rel="noopener noreferrer" className="hover:underline text-white hover:text-white">All Social Media</a>
              <a href="https://eosi-finance.gitbook.io/eosi-finance-whitepaper/tokenomics-and-stability-mechanisms-of-eosif" target="_blank" rel="noopener noreferrer" className="hover:underline text-white hover:text-white">Tokenomics</a>
              <a href="https://eosi-finance.gitbook.io/eosi-finance-whitepaper" target="_blank" rel="noopener noreferrer" className="hover:underline text-white hover:text-white">WhitePaper</a>
              <a href="https://bitcointalk.org/index.php?topic=5491205.0" target="_blank" rel="noopener noreferrer" className="hover:underline text-white hover:text-white">Bounty Programs</a>
              <a href="https://eosi-finance.gitbook.io/eosi-finance-whitepaper/disclaimer-and-risk-assessment" target="_blank" rel="noopener noreferrer" className="hover:underline text-white hover:text-white">T&Cs</a>
              <p className="font-inter text-sm text-center">Copyright © 2024 EOSI Finance</p>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-black  "></div>
        </div>

        {/* <button onClick={handleShowThankYouModal}>Show Thank You Modal</button> */}

      </div>
    </>
  );
}
