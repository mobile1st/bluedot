import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { connectMetaMask } from '../services/web3';
import { getWallet, getWalletOpenSea } from '../services/wallet';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Fortmatic from 'fortmatic';
import { OpenSeaPort, Network } from 'opensea-js';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [activeCollection, setActiveCollection] = useState(false);
    const [activeCollectionNfts, setActiveCollectionNfts] = useState(false);
    const [account, setAccount] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null);
    const [provider, setProvider] = useState();
    const [openSeaConnection, setOpenSeaConnection] = useState(null);
    const [currentGasEstimate, setCurrentGasEstimate] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('acc')) {
            setAccount(localStorage.getItem('acc'));
        }
    }, []);

    const customNetworkOptions = {
        rpcUrl: 'https://rpc-mainnet.maticvigil.com',
        chainId: 137,
    };

    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: 'INFURA_ID', // required
            },
        },
        fortmatic: {
            package: Fortmatic, // required
            options: {
                // key: process.env.FORTMATIC_LIVE_KEY, // required,
                key: 'pk_live_BC0F3B9DBDB27C28', // required,
                network: customNetworkOptions, // if we don't pass it, it will default to localhost:8454
            },
        },
    };

    // Open wallet selection modal.
    const connectWeb3 = async () => {
        if (window.ethereum) {
            console.log('window has ethereum');
        } else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.open('https://metamask.app.link/dapp/www.sudocoins.com', '_blank');
        } else {
            console.log('show modal saying to use chrome');
        }

        const web3Modal = new Web3Modal({
            network: 'mainnet', // optional
            cacheProvider: false, // optional
            disableInjectedProvider: false,
            providerOptions, // required
        });

        web3Modal.clearCachedProvider();
        const provider = await web3Modal.connect();
        console.log('provider', provider);
        setProvider(provider);
        const web3 = new Web3(provider);
        console.log(web3);

        let accounts = await web3.eth.getAccounts();
        console.log(accounts);

        let currentGasPrice = await web3.eth.getGasPrice();
        // let currentGasPrice = await web3.eth.estimateGas({ from: accounts[0] });
        setCurrentGasEstimate(web3.utils.fromWei(currentGasPrice, 'ether'));
        console.log(currentGasPrice);

        if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);

            let walletDetails = await getWallet(accounts[0]);
            console.log(walletDetails);
            if (walletDetails) {
                setAccount(walletDetails);
            }

            localStorage.setItem('acc', JSON.stringify(walletDetails));
        } else {
            console.log('you need to allow access');
        }
    };

    const connectOpenSea = async () => {
        // const web3Modal = new Web3Modal({
        //     network: 'mainnet', // optional
        //     cacheProvider: false, // optional
        //     disableInjectedProvider: false,
        //     providerOptions, // required
        // });

        // This example provider won't let you make transactions, only read-only calls:

        const seaport = new OpenSeaPort(provider, {
            networkName: Network.Main,
            // apiKey: YOUR_API_KEY,
        });
        setOpenSeaConnection(seaport);
        console.log('opensea port', seaport);
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
                connectWeb3,
                connectOpenSea,
                openSeaConnection,
                setOpenSeaConnection,
                provider,
                setProvider,
                currentGasEstimate,
                setCurrentGasEstimate,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
