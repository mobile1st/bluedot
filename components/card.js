import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/user';
import { Chart } from '../components';
import { ArrowUp } from '../svgs';
import styles from '../styles/card.module.scss';
import chartStyles from '../styles/chart.module.scss';
import layout from '../styles/layout.module.scss';

const Card = (props) => {
    const { showModal, setShowModal, activeCollection, setActiveCollection, activeCollectionNfts, chartData } =
        useUserContext();
    const [isPositive, setIsPositive] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const handleClick = () => {
        if (activeCollection === props.nft) {
            setActiveCollection(null);
        } else {
            setActiveCollection(props.nft);
        }
    };
    const handleChartClick = () => {
        console.log('clicked chart');
    };

    const displayFloorValue = () => {
        return ['NaN', '-', 'None'].includes(props.floorChange) ? '--' : `${props.floorChange}%`;
    };

    // console.log(props.nft);

    return (
        <>
            {props.type === 'collection' && (
                <div className={styles.card} onClick={handleClick}>
                    <div className={styles.left}>
                        {/* <img src={props.nft.preview_url} alt='' /> */}
                        <span className={styles.name}>{props.nft.collection_name}</span>
                    </div>
                    <div className={chartStyles.chart} onClick={handleChartClick}>
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
                            {!props.nft?.more_charts?.floor
                                ? '--'
                                : `Ξ${props.nft?.more_charts.floor[props.nft?.more_charts?.floor.length - 1].y}`}
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
                    <>
                        {activeCollectionNfts &&
                            activeCollectionNfts.length > 0 &&
                            activeCollectionNfts.map((nft) => (
                                <div className={styles['card-expanded']}>
                                    <img src={nft?.image_url} alt='' />
                                    <div className={styles.content}>
                                        <div className={styles.details}>
                                            <div className={styles.row}>
                                                <span className={styles.title}>Floor Price</span>
                                                <span className={styles.value}>
                                                    Ξ
                                                    {
                                                        activeCollection?.more_charts?.floor[
                                                            activeCollection.more_charts.floor.length - 1
                                                        ].y
                                                    }
                                                </span>
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
                                            {/* <div className={styles.row}>
                                                <span className={styles.title}>Traits</span>
                                                {nft.traits &&
                                                    nft.traits.length > 0 &&
                                                    nft.traits.map((trait) => (
                                                        <span className={styles.value}>{trait.trait_type}</span>
                                                    ))}
                                            </div> */}
                                        </div>

                                        <button className={styles.button}>Sell</button>
                                    </div>
                                </div>
                            ))}
                    </>
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
