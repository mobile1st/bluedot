import { createContext, useContext, useState, useEffect } from 'react';
import { connectMetaMask } from '../services/web3';
import { getWallet, getWalletOpenSea } from '../services/wallet';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [activeCollection, setActiveCollection] = useState(false);
    const [activeCollectionNfts, setActiveCollectionNfts] = useState(false);
    const [account, setAccount] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('acc')) {
            setAccount(localStorage.getItem('acc'));
        }
    }, []);

    const metamaskLogin = async () => {
        console.log('clicked metamask button');

        if (window.ethereum) {
            let accounts = await connectMetaMask();
            if (accounts && accounts.length > 0) {
                console.log(accounts[0]);
                setWalletAddress(accounts[0]);

                let walletDetails = await getWallet(accounts[0]);
                console.log(walletDetails);
                setAccount(walletDetails);

                localStorage.setItem('acc', JSON.stringify(walletDetails));
                // localStorage.setItem('wat', JSON.stringify(watchlist));
            } else {
                console.log('you need to allow metamask');
            }
        } else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.open('https://metamask.app.link/dapp/www.sudocoins.com', '_blank');
        } else {
            console.log('show modal saying to use chrome');
        }
    };

    return (
        <UserContext.Provider
            value={{
                showModal,
                setShowModal,
                activeCollection,
                setActiveCollection,
                activeCollectionNfts,
                setActiveCollectionNfts,
                account,
                setAccount,
                metamaskLogin,
                walletAddress,
                setWalletAddress,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
