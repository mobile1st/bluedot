import { UserProvider } from '../context/user';
import { Modal } from '../components';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
}

export default MyApp;
