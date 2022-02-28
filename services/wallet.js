const getWallet = async (ethAddress) => {
    // let response = await API.post('SudocoinsApp', '/user/import-nfts', { body: { sub: ethAddress } });
    let response = await fetch(`https://app.sudocoins.com/user/get-wallet?ethAddress=${ethAddress}`);
    return response.json();
};

const getWalletOpenSea = async (ethAddress) => {
    // let response = await API.post('SudocoinsApp', '/user/import-nfts', { body: { sub: ethAddress } });
    let response = await fetch(`https://api.opensea.io/api/v1/assets?limit=50&format=json&owner=${ethAddress}`);
    return response.json();
};

const getEthRate = async () => {
    let response = await fetch('https://app.sudocoins.com/art/get-eth-rate');
    return response.json();
};

export { getWallet, getWalletOpenSea, getEthRate };

// https://app.sudocoins.com/art/get-eth-rate
