import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUserContext } from '../context/user';
import { useRouter } from 'next/router';
import { Logo } from '../svgs';
import layout from '../styles/layout.module.scss';
import styles from '../styles/landing.module.scss';

const Home = () => {
    const router = useRouter();
    const { metamaskLogin, connectWeb3, account, walletAddress } = useUserContext();
    // const [ethAddress, setEthAddress] = useState('0xCbF6879A36C677603CdF18dB895CAc33D93fEa3A');

    useEffect(() => {
        if (account && walletAddress) {
            console.log(account);
            router.push(`/wallet/${walletAddress}`);
        }
    }, [account, walletAddress]);

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

                        <h1>Track the value of your NFT wallet</h1>
                        <div>
                            {/* <h1>Analyze Your NFT Portfolio</h1> */}
                            {/* <h1>Sell Your NFT's with One-Click</h1> */}
                        </div>

                        {/* <div className={styles.grid}>
                            <span>✅ Instant gas fee calculation</span>
                            <span>✅ Calculate price based on Rarity (Max Value)</span>
                            <span>✅ Calculate price based on Floor (Fastest)</span>
                            <span>✅ The easiest way to list and sell your nft's</span>
                        </div> */}

                        {/* <form action='#' method='get' onSubmit={handleSubmit}>
                            <input
                                type='text'
                                placeholder='Enter an ETH address'
                                value={ethAddress}
                                onChange={handleChange}
                            />
                            <input type='submit' value='➞' />
                        </form> */}
                        {/* <button onClick={metamaskLogin}>Click to Connect</button> */}
                        <button onClick={connectWeb3}>Click to Connect</button>
                        {/* <span className={styles.link}>Or enter an ETH address</span> */}

                        {/* <h2>How It Works</h2> */}

                        <div className={styles.preview}>
                            <img
                                src='https://res.cloudinary.com/dccqw6mij/image/upload/v1645809989/z4cinpned0h66bejkvpu.gif'
                                alt=''
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
