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

    const [nfts, setNfts] = useState();
    const [value, setValue] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        console.log('wallet id', id);
    }, [id]);

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                let initWallet = await getWallet(id);
                console.log(initWallet);

                if (initWallet) {
                    let walletArray = [];
                    for (var key of Object.keys(initWallet.portfolio)) {
                        walletArray.push(initWallet.portfolio[key]);
                    }
                    console.log(walletArray);

                    setNfts(walletArray);
                    setValue(initWallet.valuation);
                    setLoaded(true);
                }
            } catch (err) {
                console.log(err);
                setLoaded(false);
                router.push('/');
            }
        };

        if (id) {
            fetchData(id);
        }
    }, [id]);

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
                                <span className={styles.value}>{value} ETH</span>
                                <span className={styles.subtext}>Ξ0.27</span>
                            </div>

                            <div className={layout.grid}>
                                {nfts &&
                                    nfts.length > 0 &&
                                    nfts.map((nft) => (
                                        <>
                                            <Card type={'collection'} nft={nft}></Card>
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
