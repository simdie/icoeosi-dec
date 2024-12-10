import React from 'react';

const Modal = ({ showModal, handleAccept, handleReject }) => {
    if (!showModal) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
            <div className="bg-[#1a1919] opacity-75 w-full h-full absolute top-0 left-0"></div>
            <div className="bg-[#000000] p-8 my-[130px] mx-[10px] md:mx-[130px] rounded-md z-50 relative" style={{ width: '940px', height: '500px' }}>
                <h2 className="text-xl font-bold mb-4">EOSI Finance Private & Public Token Sale: Terms & Conditions</h2>
                <div className=" overflow-y-auto" style={{ maxHeight: '320px' }}>
                    <p className="mb-4 text-sm">
                        Please read our Terms & Conditions and Disclaimer carefully for a comprehensive understanding and compliance.
                    </p>

                    <p className="mb-3 text-sm">
                        1. We are delighted to welcome you to the EOSI Finance Private & Public Token Sale for EOSIF. This document sets forth the Terms and Conditions (T&Cs) that govern your participation in our Private Sale and Public Sale. By participating in the EOSI Finance Private Sale and Public Sale, you consent to abide by these terms.
                    </p>

                    <p className="mb-3 text-sm">
                        2. Private Sale participants will enjoy a favourable exchange rate where only 0.1 Matic (Polygon) = 1 EOSIF, ensuring a generous allocation of 5,000 EOSIF for every 500 Matic purchased. In contrast, Public Sale participants will be subject to an exchange rate of 0.6 Matic for 1 EOSIF, which translates to receiving 833.33 EOSIF for the same purchase of 500 Matic.
                    </p>

                    <p className="mb-3 text-sm">
                        3. Note: Check the tokenomics on our Pitch Deck for TGE which will now be put first into consideration.
                        The Lock-Up Period for EOSIF commences on the first day of EOSI Token’s listing on a centralized exchange and lasts for one month. Private Sale and Public Sale participants are prohibited from trading their acquired tokens during this period. This is to ensure market stability and equitable distribution of our utility tokens.
                    </p>

                    <p className="mb-3 text-sm">
                        4. Note: Check the tokenomics on our Pitch Deck for TGE which will now be put into consideration.
                        Tokens purchased in the Private Sale and Public Sale phases will be allocated to you on the day of centralized exchange listing day before trading commences. However, the release of these your EOSIF tokens will be conducted at a rate of 25% per quarter following the completion of the specified Lock-Up period which will be within 12 months unless the community votes against it.
                    </p>
                    {/* Add more content here */}

                    <p className="mb-3 text-sm">
                        5. Residents and citizens of the following territories are not permitted to participate in the EOSI Finance Private Token Sale and Public Token Sale of EOSIF: China, Canada, Iran, Iraq, Japan, India, Singapore, Korea DPR, Russia, USA (including all states, provinces, territories, and possessions), and any other countries under ICO/IDO restriction.
                    </p>

                    <p className="mb-3 text-sm">
                        6. By participating in the EOSI Finance Private Sale and Public Sale, you acknowledge and agree to these terms and conditions in their entirety. You also affirm that you are not a resident or citizen of any excluded jurisdictions mentioned in section 5.
                    </p>

                    <p className="mb-4 text-sm">
                        7. Participants are responsible for adhering to their jurisdictions’ Private Token Sale, Public Token Sale, Initial Coin Offerings (ICO) and Initial DEX Offerings (IDO) regulations. It is incumbent upon each participant to ensure compliance with local laws and regulations related to Private Token Sale, Public Token Sale, ICO and IDO participations. Furthermore, EOSI Finance retains the authority to review these terms at any given moment or adjust it. It is the duty of each participant to stay informed of any modifications to these terms, as ongoing participation in the ICO implies acceptance of such changes.
                    </p>

                    <p className="mb-4 text-base font-semibold text-red-300">
                        Additional Note:
                    </p>

                    <p className="mb-2 text-sm">
                        1. EOSI Finance is an experimental idea and is not licensed. If you decide to make use of EOSI Finance, you do so at your own risk. As this is still an experimental technology, you should not invest funds that you wouldn’t be able to lose.
                    </p>

                    <p className="mb-4 text-sm">
                        2. We shall not be responsible to any person or entity for any losses or damages particularly or in whole, related to any transactions (direct, indirect, special, consequential or incidental damages whatsoever).
                    </p>
                </div>

                <div className="flex justify-start pt-[20px] sm:pt-[30px] ">
                    <button
                        className="bg-[#02FA1B] text-black py-[4px] px-4 rounded-full mr-4 text-sm font-semibold hover:opacity-70"
                        onClick={handleAccept}
                    >
                        AGREE
                    </button>
                    <button className="bg-[#FA0404] text-black py-[4px] px-4 rounded-full text-sm font-semibold hover:opacity-70" onClick={handleReject}>
                        DISAGREE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
