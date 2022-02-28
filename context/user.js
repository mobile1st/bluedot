import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { connectMetaMask } from '../services/web3';
import { getWallet, getWalletOpenSea } from '../services/wallet';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [activeCollection, setActiveCollection] = useState(false);
    const [activeCollectionNfts, setActiveCollectionNfts] = useState(false);
    const [account, setAccount] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [provider, setProvider] = useState();

    useEffect(() => {
        if (localStorage.getItem('acc')) {
            setAccount(localStorage.getItem('acc'));
        }
    }, []);

    // Open wallet selection modal.
    const loadWeb3Modal = async () => {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                    infuraId: 'INFURA_ID', // required
                },
            },
        };

        const web3Modal = new Web3Modal({
            network: 'mainnet', // optional
            cacheProvider: true, // optional
            providerOptions, // required
        });

        const provider = await web3Modal.connect();

        const web3 = new Web3(provider);
        console.log(web3);
    };

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
                walletAddress,
                setWalletAddress,
                metamaskLogin,
                loadWeb3Modal,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
