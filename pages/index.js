import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Logo } from '../svgs';
import layout from '../styles/layout.module.scss';
import styles from '../styles/landing.module.scss';

const Home = () => {
    const router = useRouter();
    const [ethAddress, setEthAddress] = useState();

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
                        <Logo height='60' width='60'></Logo>

                        <h1>Track the value of any NFT wallet</h1>

                        <form action='#' method='get' onSubmit={handleSubmit}>
                            <input
                                type='text'
                                placeholder='Enter an ETH address or ENS'
                                value={ethAddress}
                                onChange={handleChange}
                            />
                            <input type='submit' value='➞' />
                        </form>
                        <span className={styles.link}>
                            Powered by{' '}
                            <a href='https://sudocoins.com' className={styles.link} style={{ fontWeight: '700' }}>
                                Sudocoins
                            </a>
                        </span>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
