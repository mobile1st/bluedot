import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUserContext } from '../../context/user';
import { useRouter } from 'next/router';
import { Card, Modal } from '../../components';
import { Logo } from '../../svgs';
import { getWallet } from '../../apis/wallet';

import layout from '../../styles/layout.module.scss';
import styles from '../../styles/wallet.module.scss';

const Website = () => {
    const { showModal, setShowModal } = useUserContext();
    const router = useRouter();
    const { id } = router.query;

    const [loaded, setLoaded] = useState(false);
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        console.log('wallet id', id);
    }, [id]);

    useEffect(() => {
        console.log(wallet);
    }, [wallet]);

    useEffect(() => {
        const fetchData = async (id) => {
            let initWallet = await getWallet(id);

            let sortedNfts = [];

            sortedNfts = [...initWallet.nfts].sort((a, b) =>
                a.open_sea_stats.floor_price < b.open_sea_stats.floor_price ? 1 : -1
            );
            initWallet.nfts = sortedNfts;
            console.log(initWallet);
            setWallet(initWallet);
            setLoaded(true);
        };

        if (id && !loaded && !wallet) {
            fetchData(id);
        }
    }, [id, loaded, wallet]);

    const formatNumber = (number) => {
        return parseFloat(number).toLocaleString('en-US');
    };

    const calculateFloorDifference = (nft) => {
        if (nft?.more_charts?.floor?.length) {
            let length = nft.more_charts.floor.length;
            let currentValue = nft.more_charts.floor[length - 1]?.y;
            let previousValue = nft.more_charts.floor[length - 2]?.y;

            return percentageDifference(currentValue, previousValue);
        } else {
            return '-';
        }
    };

    const percentageDifference = (a, b) => {
        return `${(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)}%`;
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

            {loaded && (
                <>
                    <header>
                        <div>
                            <Link href='/'>home</Link>
                        </div>
                        <Logo></Logo>
                    </header>
                    <main className={`${layout.page} ${showModal ? layout['no-scroll'] : ''}`}>
                        <div className={layout.content}>
                            <div className={styles.overview}>
                                <span className={styles.subtext}>min. value</span>
                                <span className={styles.value}>${formatNumber(wallet?.usd_valuation)}</span>
                                <span className={styles.subtext}>{wallet?.eth_valuation} ETH</span>
                            </div>

                            <div className={layout.grid}>
                                {wallet.nfts &&
                                    wallet.nfts.length > 0 &&
                                    wallet.nfts.map((nft) => (
                                        <>
                                            <Card
                                                type={'collection'}
                                                nft={nft}
                                                floorChange={calculateFloorDifference(nft)}
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
