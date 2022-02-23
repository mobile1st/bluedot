import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUserContext } from '../context/user';
import { useRouter } from 'next/router';
import { Card } from '../components';
import { CloseButton } from '../svgs';
import layout from '../styles/layout.module.scss';
import styles from '../styles/modal.module.scss';

const Modal = ({ collection }) => {
    const { setShowModal, activeCollection, setActiveCollection } = useUserContext();
    const router = useRouter();
    const [ethAddress, setEthAddress] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (activeCollection) {
            setLoaded(true);
        }
    }, [activeCollection]);
    console.log(activeCollection);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('submitted', ethAddress);
        router.push(`/wallet/${ethAddress}`);
    };

    const handleClose = () => {
        setShowModal(false);
        setActiveCollection(null);
    };

    const percentageDifference = (a, b) => {
        setLoaded(true);
        return `${(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)}%`;
    };

    return (
        <>
            <main className={styles.modal}>
                <div className={styles.background}>
                    {!loaded && <span>Loading...</span>}

                    {loaded && activeCollection && (
                        <div className={styles.content}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'grid', rowGap: '.5em' }}>
                                    <img
                                        src='https://lh3.googleusercontent.com/8RJY7K-hWX0Cmv_HNnd2GZGKPlMHXr682AECe7dEELBT59down-uwNojACEHDgANjAIPebPSzA8m2ZrdWv61AEz3SVDprwvWs-9aOA=s120'
                                        alt=''
                                    />
                                    <h1>{activeCollection?.collection_name}</h1>
                                </div>

                                <CloseButton onClick={handleClose}></CloseButton>
                            </div>

                            {/* <div style={{ display: 'grid', rowGap: '.5em' }}>
                                <h1>{activeCollection?.collection_name}</h1>
                                <div className={layout.flex}>
                                    <a href='/'>OpenSea</a>
                                    <a href='/'>Twitter</a>
                                </div>
                            </div> */}

                            {/* <div className={layout.flex}>
                                <button className={`${styles.time} ${styles.active}`}>24H</button>
                                <button className={styles.time}>3D</button>
                                <button className={styles.time}>7D</button>
                                <button className={styles.time}>1M</button>
                            </div> */}

                            <div className={layout.grid}>
                                <Card
                                    type='data'
                                    data='floor'
                                    value={activeCollection?.open_sea_stats?.floor_price}
                                    delta={6.71}
                                ></Card>
                                <Card
                                    type='data'
                                    data='trading activity'
                                    value={
                                        activeCollection?.more_charts?.sales[
                                            activeCollection?.more_charts?.sales.length - 1
                                        ].y
                                    }
                                    delta={2641}
                                ></Card>
                                {/* <Card type='data' data='sales volume' value={'Ξ2650'} delta={71}></Card> */}
                                {/* <Card type='data' data='buyers' value={86} delta={2.3}></Card> */}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Modal;
