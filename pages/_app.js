import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { useState } from 'react';
import Header from './components/Header';
import Modal from './components/Modal';

import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "PolygonAmoyTestnet";

function MyApp({ Component, pageProps }) {
	const [showModal, setShowModal] = useState(true);

	const handleAccept = () => {
		setShowModal(false);
	};

	const handleReject = () => {
		window.location.href = 'https://eosifinance.org';
	};

	return (
		<ThirdwebProvider
			activeChain={PolygonAmoyTestnet}
			clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
		>

			<Modal showModal={showModal} handleAccept={handleAccept} handleReject={handleReject} />

			<Component {...pageProps} />
		</ThirdwebProvider>
	);

}

export default MyApp;
