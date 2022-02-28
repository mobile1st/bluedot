import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

const connectMetaMask = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
        console.log('there is a provider', provider);
        try {
            provider.on('accountChanged', (code, reason) => {
                console.log('account changed', code, reason);
            });

            // await window.ethereum.enable();

            window.ethereum.on('connect', () => {
                console.log('connected');
            });

            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return accounts;
        } catch (err) {
            console.log('You need to allow meta mask', err);
            return;
        }
    } else {
        console.log('no provider, stop dapp');
    }

    // web3 = new Web3(provider);
    // accounts = await web3.eth.getAccounts();
    // console.log(accounts[0]);
};

export { connectMetaMask };
