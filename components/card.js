import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/user';
import { Chart } from '../components';
import { ArrowUp } from '../svgs';
import styles from '../styles/card.module.scss';
import chartStyles from '../styles/chart.module.scss';
import layout from '../styles/layout.module.scss';

const Card = (props) => {
    const { showModal, setShowModal, activeCollection, setActiveCollection, chartData } = useUserContext();
    const [isPositive, setIsPositive] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const handleClick = () => {
        if (activeCollection === props.nft) {
            setActiveCollection(null);
        } else {
            setActiveCollection(props.nft);
        }
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

    const displayFloorValue = () => {
        return ['NaN', '-', 'None'].includes(props.floorChange) ? '--' : `${props.floorChange}%`;
    };

    return (
        <>
            {props.type === 'collection' && (
                <div className={styles.card} onClick={handleClick}>
                    <div className={styles.left}>
                        {/* <img src={props.nft.preview_url} alt='' /> */}
                        <span className={styles.name}>{props.nft.collection_name}</span>
                    </div>
                    <div className={chartStyles.chart}>
                        <Chart
                            type='floor'
                            title='Floor'
                            data={props.nft.more_charts?.floor}
                            showLabel={false}
                            className={chartStyles.chart}
                            color={props.floorChange > 0.0 ? 'green' : props.floorChange < 0.0 ? 'red' : 'gray'}
                        ></Chart>
                    </div>
                    <div className={styles.right}>
                        {/* <span className={styles.percent}>{props.floorChange}</span> */}
                        <span className={styles.value}>
                            {['None'].includes(props.nft?.open_sea_stats?.floor_price)
                                ? '--'
                                : `Ξ${props.nft?.open_sea_stats?.floor_price}`}
                        </span>

                        <span
                            className={styles['filled-background']}
                            style={{
                                background:
                                    props.floorChange > 0.0 ? 'green' : props.floorChange < 0.0 ? 'red' : 'gray',
                            }}
                        >
                            {displayFloorValue()}
                        </span>
                    </div>
                    {/* <span></span> */}
                </div>
            )}
            <>
                {activeCollection === props.nft && (
                    <div className={styles['card-expanded']}>
                        <img src={activeCollection.preview_url} alt='' />
                        <div className={styles.content}>
                            <div className={styles.details}>
                                <div className={styles.row}>
                                    <span className={styles.title}>Floor Price</span>
                                    <span className={styles.value}>$200</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.title}>Service Fee</span>
                                    <span className={styles.value}>$5.00</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.title}>Gas Fee (Est)</span>
                                    <span className={styles.value}>$210.45</span>
                                </div>
                                <div className={styles.row}>
                                    <span className={styles.title}>You'll Receive</span>
                                    <span className={styles.value}>$189.55</span>
                                </div>
                            </div>

                            <button className={styles.button}>Sell</button>
                        </div>
                    </div>
                )}
            </>

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
