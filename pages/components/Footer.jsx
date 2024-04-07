
import { useEffect } from 'react';
import Image from 'next/image';

const Footer = () => {
    useEffect(() => {
        // Function to move images horizontally
        const moveImages = () => {
            const images = document.querySelectorAll('.moving-image');
            images.forEach(image => {
                let position = 0;
                const moveInterval = setInterval(() => {
                    position -= 1; // Adjust this value to control the speed of movement
                    image.style.transform = `translateX(${position}px)`;
                    if (position <= -image.clientWidth) {
                        position = window.innerWidth;
                    }
                }, 30); // Adjust this value for smoother or faster movement
            });
        };
        moveImages();
    }, []);

    return (
        <footer className="fixed bottom-0 w-full h-[70px] bg-black text-white p-5 gap-[50px] overflow-hidden flex ">
            {/* Moving images */}
            <div className="moving-image" style={{ left: '0' }}>
                <Image src="/images/frework.png" alt="" width={130} height={130} />
            </div>
            <div className="moving-image" style={{ left: '250px' }}>
                <Image src="/images/coincodex.png" alt="" width={130} height={130} />
            </div>
            <div className="moving-image" style={{ left: '500px' }}>
                <Image src="/images/cgrader.png" alt="" width={130} height={130} />
            </div>

            <div className="moving-image" style={{ left: '400%' }}>
                <Image src="/images/getname.png" alt="" width={130} height={130} />
            </div>
            <div className="moving-image" style={{ left: '500%' }}>
                <Image src="/images/altco.png" alt="" width={130} height={130} />
            </div>
            <div className="moving-image" style={{ left: '600%' }}>
                <Image src="/images/base.png" alt="" width={130} height={130} />
            </div>
            <div className="moving-image" style={{ left: '700%' }}>
                <Image src="/images/parsevc.png" alt="" width={130} height={130} />
            </div>
            <div className="moving-image" style={{ left: '800%' }}>
                <Image src="/images/ainave.png" alt="" width={130} height={130} />
            </div>
            <div className="moving-image" style={{ left: '900%' }}>
                <Image src="/images/aitopreviews.png" alt="" width={130} height={130} />
            </div>
            <div className="moving-image" style={{ left: '1000%' }}>
                <Image src="/images/allinone.png" alt="" width={130} height={130} />
            </div>
            <div className="moving-image" style={{ left: '1100%' }}>
                <Image src="/images/aiapps.png" alt="" width={130} height={130} />
            </div>
            <div className="moving-image" style={{ left: '1200%' }}>
                <Image src="/images/link.png" alt="" width={130} height={130} />
            </div>
            <div className="moving-image" style={{ left: '1300%' }}>
                <Image src="/images/tolify.png" alt="" width={130} height={130} />
            </div>

            <div className="moving-image" style={{ left: '1400%' }}>
                <Image src="/images/bai.png" alt="" width={130} height={130} />
            </div>


            {/* Add more images as needed */}
        </footer>
    );
};

export default Footer;

