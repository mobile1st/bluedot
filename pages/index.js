import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Logo } from '../svgs';
import layout from '../styles/layout.module.scss';
import styles from '../styles/landing.module.scss';

const Home = () => {
    const router = useRouter();
    const [ethAddress, setEthAddress] = useState('0xCbF6879A36C677603CdF18dB895CAc33D93fEa3A');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('submitted', ethAddress);
        router.push(`/wallet/${ethAddress}`);
    };

    const handleChange = (e) => {
        setEthAddress(e.target.value);
    };

    return (
        <>
            <main className={layout.page}>
                <div className={layout.content}>
                    <div className={styles.landing}>
                        <Logo height='60' width='60' style={{ margin: 'auto' }}></Logo>

                        {/* <h1>Track the value of any NFT wallet</h1> */}
                        <h1>Sell NFT's in a Click, for Max Value</h1>

                        <div className={styles.grid}>
                            <span>✅ Instant Gas Fee Calculation</span>
                            <span>✅ Calculate Sell Price Based on Rarity (Max Value)</span>
                            <span>✅ Calculate Sell Price By Floor (Quickest)</span>
                            <span>✅ Instant Receive Sales</span>
                        </div>

                        <form action='#' method='get' onSubmit={handleSubmit}>
                            <input
                                type='text'
                                placeholder='Enter an ETH address'
                                value={ethAddress}
                                onChange={handleChange}
                            />
                            <input type='submit' value='➞' />
                        </form>
                        <span className={styles.link}>
                            Powered by{' '}
                            <a
                                href='https://sudocoins.com'
                                target='_blank'
                                className={styles.link}
                                style={{ fontWeight: '700' }}
                            >
                                Sudocoins
                            </a>
                        </span>

                        <h2>How It Works</h2>

                        <div className={styles.preview}>
                            <img
                                src='https://res.cloudinary.com/dccqw6mij/image/upload/v1645809989/z4cinpned0h66bejkvpu.gif'
                                alt=''
                            />
                        </div>

                        {/* <div className={styles.content}>
                            <h2>Steps</h2>

                            <div className={styles.grid}>
                                <span>1. Connect your wallet</span>
                                <span>2. We calculate your NFT's current value</span>
                                <span>3. Click sell</span>
                                <span>4. We list and sell your nft for you</span>
                                <span>5. You receive your money</span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
