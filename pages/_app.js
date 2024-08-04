import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Modal from './components/Modal';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import { Polygon } from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "PolygonAmoyTestnet";

function MyApp({ Component, pageProps }) {
	const [showModal, setShowModal] = useState(true);
	const [authenticated, setAuthenticated] = useState(false);
	const router = useRouter();

	const handleAccept = () => {
		setShowModal(false);
	};

	const handleReject = () => {
		window.location.href = 'https://eosifinance.org';
	};

	// Check authentication status on app load
	useEffect(() => {
		const checkAuth = async () => {
			const { data: { session } } = await supabase.auth.getSession();

			if (!session && router.pathname.startsWith('/admin')) {
				// If the user is not authenticated and trying to access an admin route, redirect to login
				router.push('/admin/login');
			} else {
				setAuthenticated(true);
			}
		};

		checkAuth();
	}, [router.pathname]);

	// Prevent rendering the component until authentication is checked
	if (!authenticated && router.pathname.startsWith('/admin') && router.pathname !== '/admin/login') {
		return null;
	}

	return (
		<ThirdwebProvider
			activeChain={Polygon}
			clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
		>
			<Modal showModal={showModal} handleAccept={handleAccept} handleReject={handleReject} />

			<Component {...pageProps} />
		</ThirdwebProvider>
	);
}

export default MyApp;
