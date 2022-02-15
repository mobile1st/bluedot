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

    return (
        <>
            <main className={styles.modal}>
                <div className={styles.background}>
                    {!loaded && <span>Loading...</span>}

                    {loaded && activeCollection && (
                        <div className={styles.content}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <img
                                    src='https://lh3.googleusercontent.com/8RJY7K-hWX0Cmv_HNnd2GZGKPlMHXr682AECe7dEELBT59down-uwNojACEHDgANjAIPebPSzA8m2ZrdWv61AEz3SVDprwvWs-9aOA=s120'
                                    alt=''
                                />

                                <CloseButton onClick={handleClose}></CloseButton>
                            </div>

                            <h1>{activeCollection?.collection_name}</h1>
                            {/* <div style={{ display: 'grid', rowGap: '.5em' }}>
                                <h1>{activeCollection?.collection_name}</h1>
                                <div className={layout.flex}>
                                    <a href='/'>OpenSea</a>
                                    <a href='/'>Twitter</a>
                                </div>
                            </div> */}

                            <div className={layout.flex}>
                                <button className={`${styles.time} ${styles.active}`}>1H</button>
                                <button className={styles.time}>24H</button>
                                <button className={styles.time}>7D</button>
                            </div>

                            <div className={layout.grid}>
                                <Card type='data' data='floor' value={'Ξ15'} delta={6.71}></Card>
                                <Card type='data' data='trading activity' value={712} delta={2641}></Card>
                                <Card type='data' data='sales volume' value={'Ξ2650'} delta={71}></Card>
                                <Card type='data' data='buyers' value={86} delta={2.3}></Card>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Modal;
