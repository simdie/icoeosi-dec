import React from 'react'
import { ConnectWallet } from '@thirdweb-dev/react'
import Image from 'next/image'

function Header() {
    return (
        <>
            <div className={`flex  justify-between items-center px-[20px] m-[24px] mb-[60px] py-[8px] sm:mx-[50px] sm:px-[30px] relative bg-purple rounded-full `}>

                {/* Spinning Eye Image */}
                <div className=" hidden md:block absolute   md:top-5 md:left-[80px] transform -translate-x-1/2">
                    <Image
                        src="/images/eosiEye.svg"
                        alt="Circular Image"
                        className="rounded-full animate-spin"
                        style={{ animationDuration: '10s' }}
                        width={44} // Width of the image
                        height={44} />
                </div>

                {/* Eosi Finance Logo */}
                <div className=''>
                    <Image
                        src="/images/eosiLogo.png"
                        alt="Eosi Finance"
                        width={380} // Width of the image
                        height={68} // Height of the image
                    />
                </div>

                {/* Connect Wallet Button */}
                <div>
                    <ConnectWallet style={{ width: "150px" }} />
                </div>
            </div>
        </>
    )
}

export default Header
