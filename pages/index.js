import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUserContext } from '../context/user';
import { useRouter } from 'next/router';
import { Logo } from '../svgs';
import layout from '../styles/layout.module.scss';
import styles from '../styles/landing.module.scss';

const Home = () => {
    const router = useRouter();
    const { metamaskLogin, account, walletAddress } = useUserContext();
    // const [ethAddress, setEthAddress] = useState('0xCbF6879A36C677603CdF18dB895CAc33D93fEa3A');

    useEffect(() => {
        if (account) {
            console.log(account);
            router.push(`/wallet/${walletAddress}`);
        }
    }, [account]);

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
                        <h1>Analyze and Sell Your NFT's, Fast</h1>

                        <div className={styles.grid}>
                            <span>✅ Instant gas fee calculation</span>
                            <span>✅ Calculate price based on Rarity (Max Value)</span>
                            <span>✅ Calculate price based on Floor (Fastest)</span>
                            <span>✅ The easiest way to list and sell your nft's</span>
                        </div>

                        {/* <form action='#' method='get' onSubmit={handleSubmit}>
                            <input
                                type='text'
                                placeholder='Enter an ETH address'
                                value={ethAddress}
                                onChange={handleChange}
                            />
                            <input type='submit' value='➞' />
                        </form> */}
                        <button onClick={metamaskLogin}>connect your wallet</button>
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
