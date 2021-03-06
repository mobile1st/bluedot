import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUserContext } from '../../context/user';
import { useRouter } from 'next/router';
import { Card, Modal } from '../../components';
import { Logo } from '../../svgs';
import { getWallet, getWalletOpenSea } from '../../services/wallet';

import layout from '../../styles/layout.module.scss';
import styles from '../../styles/wallet.module.scss';

const Website = () => {
    const {
        showModal,
        setShowModal,
        activeCollection,
        activeCollectionNfts,
        setActiveCollectionNfts,
        account,
        setAccount,
        connectWeb3,
        connectOpenSea,
        openSeaConnection,
        setOpenSeaConnection,
    } = useUserContext();
    const router = useRouter();
    const { id } = router.query;

    const [loaded, setLoaded] = useState(false);
    const [wallet, setWallet] = useState(null);
    const [ethValuation, setEthValuation] = useState(null);
    const [usdValuation, setUsdValuation] = useState(null);
    const [nftData, setNftData] = useState(null);

    useEffect(() => {
        console.log('account', account);
    }, [account]);

    // useEffect(() => {
    //     console.log('wallet id', id);
    // }, [id]);

    // useEffect(() => {
    //     console.log(wallet);
    // }, [wallet]);

    useEffect(() => {
        if (activeCollection && nftData && nftData.length > 0) {
            let nfts = nftData.filter((c) => c.collection_name === activeCollection.collection_name);
            setActiveCollectionNfts(nfts);
        } else {
            setActiveCollectionNfts(null);
        }
    }, [activeCollection, nftData]);

    useEffect(() => {
        const fetchData = async (id) => {
            let initWallet = await getWallet(id);
            let sortedNfts = [];

            if (initWallet?.nfts && initWallet.nfts.length > 0) {
                sortedNfts = [...initWallet.nfts].sort((a, b) => {
                    // console.log(a);
                    return a.open_sea_stats.floor_price < b.open_sea_stats.floor_price ? 1 : -1;
                });
            } else {
                sortedNfts = [];
            }

            console.log(account);

            initWallet.nfts = sortedNfts;
            console.log(initWallet);
            console.log(sortedNfts);
            setWallet(sortedNfts);
            setEthValuation(initWallet.eth_valuation);
            setUsdValuation(initWallet.usd_valuation);
            setLoaded(true);
        };

        if (id && !loaded && !wallet) {
            fetchData(id);
        }
    }, [id, loaded, wallet]);

    useEffect(() => {
        const fetchOpenSeaData = async (id) => {
            let openSeaData = await getWalletOpenSea(id);
            console.log(openSeaData.assets);
            let sortedOpenSeaData = [];

            for (let index = 0; index < openSeaData.assets.length; index++) {
                const element = openSeaData.assets[index];

                let data = {
                    collection_name: element.collection.name,
                    image_url: element.image_url,
                    traits: element.traits,
                    token_id: element.token_id,
                    token_address: element?.asset_contract?.address,
                    schema_name: element?.asset_contract?.schema_name,
                };
                sortedOpenSeaData.push(data);
            }

            console.log(sortedOpenSeaData);
            setNftData(sortedOpenSeaData);
        };

        if (wallet) {
            fetchOpenSeaData(id);
        }
    }, [wallet, id]);

    const handleLogout = () => {
        localStorage.removeItem('acc');
        setAccount(null);
        router.push(`/`);
    };

    const formatNumber = (number) => {
        return parseFloat(number).toFixed(2).toLocaleString('en-US');
    };

    const calculateFloorDifference = (nft) => {
        if (nft?.more_charts?.floor?.length) {
            let length = nft.more_charts.floor.length;
            let currentValue = nft.more_charts.floor[length - 1]?.y;
            let previousValue = nft.more_charts.floor[0]?.y;

            return percentageDifference(currentValue, previousValue);
        } else {
            return '-';
        }
    };

    const percentageDifference = (a, b) => {
        let change = 100 * Math.abs((a - b) / ((a + b) / 2));
        return change.toFixed(2);
    };

    return (
        <>
            {showModal && <Modal></Modal>}
            {!loaded && (
                <>
                    <main className={layout.page}>
                        <div className={layout.content}>
                            <div className={styles.overview}>
                                <span>Loading...</span>
                            </div>
                        </div>
                    </main>
                </>
            )}

            {loaded && wallet && wallet.length > 0 && (
                <>
                    <main className={`${layout.page} ${styles.wallet} ${showModal ? layout['no-scroll'] : ''}`}>
                        <div className={layout.content}>
                            <div className={styles.overview}>
                                <span className={styles.subtext}>Min value</span>
                                <span className={styles.value}>${formatNumber(usdValuation)}</span>
                                <span className={styles.subtext}>{ethValuation.toFixed(2)} ETH</span>
                            </div>

                            <div className={layout.grid}>
                                {wallet &&
                                    wallet.length > 0 &&
                                    wallet.map((nft) => (
                                        <>
                                            <Card
                                                type={'collection'}
                                                nft={nft}
                                                floorChange={calculateFloorDifference(nft)}
                                                chartData={nft?.more_charts?.floor}
                                            ></Card>
                                        </>
                                    ))}
                            </div>
                        </div>
                    </main>
                </>
            )}
        </>
    );
};

export default Website;

// 0xCbF6879A36C677603CdF18dB895CAc33D93fEa3A
