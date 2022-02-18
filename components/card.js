import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/user';
import { ArrowUp } from '../svgs';
import styles from '../styles/card.module.scss';

const Card = (props) => {
    const { showModal, setShowModal, setActiveCollection } = useUserContext();
    const [isPositive, setIsPositive] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const handleClick = () => {
        setShowModal(true);
        setActiveCollection(props.nft);
    };

    // console.log(props.nft);

    const percentageDifference = (a, b) => {
        setLoaded(true);
        return `${(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)}%`;
    };

    // const calculateFloorDifference = () => {
    //     if (props.nft?.more_charts?.floor?.length) {
    //         let length = props.nft.more_charts.floor.length;
    //         let currentValue = props.nft.more_charts.floor[length - 1].y;
    //         let previousValue = props.nft.more_charts.floor[length - 2].y;

    //         setIsPositive(currentValue > previousValue);

    //         console.log(currentValue - previousValue);

    //         console.log(percentageDifference(currentValue, previousValue));
    //         return percentageDifference(currentValue, previousValue);
    //     } else {
    //         return '-';
    //     }
    // };

    // useEffect(() => {
    //     if (!loaded && props?.nft?.more_charts?.floor) {
    //         calculateFloorDifference();
    //     }
    // }, [props.nft]);

    return (
        <>
            {props.type === 'collection' && (
                <div className={styles.card} onClick={handleClick}>
                    <div className={styles.left}>
                        <img src={props.nft.preview_url} alt='' />
                        <span className={styles.name}>{props.nft.collection_name}</span>
                    </div>
                    {/* <div className={styles.right}>
                        <span className={styles.percent}>{props.floorChange}</span>
                        <span>
                            <ArrowUp></ArrowUp>
                        </span>
                    </div> */}
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
