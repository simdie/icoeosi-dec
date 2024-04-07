// components/Carousel.js
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './carousel.module.css'; // Import CSS module

import ee from '../../public/images/ee.png';
import ee2 from '../../public/images/ee2.png';
import ee3 from '../../public/images/ee3.png';
import ee4 from '../../public/images/ee4.png';
import ee5 from '../../public/images/ee5.png';


export default function Carousel() {
    const [logos, setLogos] = useState([]);

    useEffect(() => {
        const logosArray = [
            { src: ee, alt: 'ee' },
            { src: ee2, alt: 'ee2' },
            { src: ee3, alt: 'ee3' },
            { src: ee4, alt: 'ee4' },
            { src: ee5, alt: 'ee5' },

        ];
        setLogos(logosArray);
    }, []);

    return (
        <div className="w-full overflow-hidden ">
            <div className="w-full overflow-hidden">
                <div className={`w-full flex space-x-4 ${styles['animate-scrolling']}`}>
                    {logos.map((logo, index) => (
                        <div key={index} className="flex-none">
                            <Image src={logo.src} alt={logo.alt} height={140} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
