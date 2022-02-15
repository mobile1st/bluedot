const getWallet = async (ethAddress) => {
    // let response = await API.post('SudocoinsApp', '/user/import-nfts', { body: { sub: ethAddress } });
    let response = await fetch('https://app.sudocoins.com/user/import-nfts', {
        method: 'POST',
        body: JSON.stringify({ sub: ethAddress }),
    });
    return response.json();
};

export { getWallet };

// https://app.sudocoins.com/art/get-eth-rate
