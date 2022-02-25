import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUserContext } from '../../context/user';
import { useRouter } from 'next/router';
import { Card, Modal } from '../../components';
import { Logo } from '../../svgs';
import { getWallet, getWalletOpenSea } from '../../apis/wallet';

import layout from '../../styles/layout.module.scss';
import styles from '../../styles/wallet.module.scss';

const Website = () => {
    const { showModal, setShowModal, activeCollection, activeCollectionNfts, setActiveCollectionNfts } =
        useUserContext();
    const router = useRouter();
    const { id } = router.query;

    const [loaded, setLoaded] = useState(false);
    const [wallet, setWallet] = useState(null);
    const [ethValuation, setEthValuation] = useState(null);
    const [usdValuation, setUsdValuation] = useState(null);
    const [nftData, setNftData] = useState(null);

    // useEffect(() => {
    //     console.log('wallet id', id);
    // }, [id]);

    // useEffect(() => {
    //     console.log(wallet);
    // }, [wallet]);

    useEffect(() => {
        if (activeCollection) {
            let nfts = nftData.filter((c) => c.collection_name === activeCollection.collection_name);
            setActiveCollectionNfts(nfts);
        } else {
            setActiveCollectionNfts(null);
        }
    }, [activeCollection]);

    useEffect(() => {
        const fetchData = async (id) => {
            let initWallet = await getWallet(id);
            let sortedNfts = [];

            sortedNfts = [...initWallet.nfts].sort((a, b) => {
                // console.log(a);
                return a.open_sea_stats.floor_price < b.open_sea_stats.floor_price ? 1 : -1;
            });

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
                    <header>
                        <div>
                            {/* <Link href='/'>home</Link> */}
                            {/* <a
                                href='https://airtable.com/shrGT8FfJrFZWS3BC'
                                target='_blank'
                                className={layout['header-link']}
                            >
                                Request a Feature
                            </a> */}
                        </div>
                        {/* <h4>good good</h4> */}
                        {/* <Logo></Logo> */}
                    </header>
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
