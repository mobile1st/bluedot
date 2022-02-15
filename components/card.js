import React from 'react';
import { useUserContext } from '../context/user';
import { ArrowUp } from '../svgs';
import styles from '../styles/card.module.scss';

const Card = (props) => {
    const { showModal, setShowModal, setActiveCollection } = useUserContext();

    const handleClick = () => {
        setShowModal(true);
        setActiveCollection(props.nft);
    };

    return (
        <>
            {props.type === 'collection' && (
                <div className={styles.card} onClick={handleClick}>
                    <div className={styles.left}>
                        <img src={props.nft.preview_url} alt='' />
                        <span className={styles.name}>{props.nft.collection_name}</span>
                    </div>
                    <div className={styles.right}>
                        <span className={styles.percent}>+2.3%</span>
                        <span>
                            <ArrowUp></ArrowUp>
                        </span>
                    </div>
                </div>
            )}

            {props.type === 'data' && (
                <div className={styles.card}>
                    <div className={styles.grid}>
                        <span className={styles.subtext}>{props.data}</span>
                        <span className={styles.value}>{props.value}</span>
                    </div>
                    <div className={styles.right}>
                        <span className={`${styles['percent-large']}`}>{props.delta}%</span>
                        <span>
                            <ArrowUp></ArrowUp>
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Card;
