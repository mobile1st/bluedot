import React, { useEffect, useState } from 'react';
import { useUserContext } from '../context/user';
import { Chart } from '../components';
import { ArrowUp } from '../svgs';
import styles from '../styles/card.module.scss';
import chartStyles from '../styles/chart.module.scss';
import layout from '../styles/layout.module.scss';
import { OpenSeaPort, Network } from 'opensea-js';

const Card = (props) => {
    const {
        showModal,
        setShowModal,
        activeCollection,
        setActiveCollection,
        activeCollectionNfts,
        chartData,
        walletAddress,
        provider,
        currentGasEstimate,
        setCurrentGasEstimate,
    } = useUserContext();
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

    const createSellOrder = async (token) => {
        console.log('provider', provider);
        console.log('token', token);
        // Expire this auction one day from now.
        // Note that we convert from the JavaScript timestamp (milliseconds):
        const seaport = new OpenSeaPort(provider, {
            networkName: Network.Main,
            // apiKey: YOUR_API_KEY,
        });

        console.log('seaport', seaport);

        let tokenId = token.token_id;
        let tokenAddress = token.token_address;
        let accountAddress = walletAddress;

        const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);

        const listing = await seaport.createSellOrder({
            asset: {
                tokenId,
                tokenAddress,
            },
            accountAddress,
            startAmount: 3,
            // If `endAmount` is specified, the order will decline in value to that amount until `expirationTime`. Otherwise, it's a fixed-price order:
            // endAmount: 0.1,
            expirationTime,
        });

        console.log(listing);
    };

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
                        <div className={styles['card-expanded']}>
                            <div className={styles.content}>
                                <div className={styles.details}>
                                    <div className={styles.row}>
                                        <span className={styles.title}>Floor Price</span>
                                        {activeCollection?.more_charts?.floor &&
                                            activeCollection?.more_charts?.floor.length > 0 && (
                                                <span className={styles.value}>
                                                    Ξ
                                                    {
                                                        activeCollection?.more_charts?.floor[
                                                            activeCollection?.more_charts?.floor?.length - 1
                                                        ].y
                                                    }
                                                </span>
                                            )}
                                    </div>
                                    <div className={styles.row}>
                                        <span className={styles.title}>Sales</span>
                                        {activeCollection?.more_charts?.sales &&
                                            activeCollection?.more_charts?.sales.length > 0 && (
                                                <span className={styles.value}>
                                                    {
                                                        activeCollection?.more_charts?.sales[
                                                            activeCollection?.more_charts?.sales?.length - 1
                                                        ].y
                                                    }
                                                </span>
                                            )}
                                    </div>
                                    <div className={styles.row}>
                                        <span className={styles.title}>Volume</span>
                                        {activeCollection?.more_charts?.volume &&
                                            activeCollection?.more_charts?.volume.length > 0 && (
                                                <span className={styles.value}>
                                                    Ξ
                                                    {
                                                        activeCollection?.more_charts?.volume[
                                                            activeCollection?.more_charts?.volume?.length - 1
                                                        ].y
                                                    }
                                                </span>
                                            )}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.details}>
                                    <div className={styles.row}>
                                        <span className={styles.title}>Floor Price (1d ago)</span>
                                        {activeCollection?.more_charts?.floor &&
                                            activeCollection?.more_charts?.floor.length > 1 && (
                                                <span className={styles.value}>
                                                    Ξ
                                                    {
                                                        activeCollection?.more_charts?.floor[
                                                            activeCollection?.more_charts?.floor?.length - 2
                                                        ].y
                                                    }
                                                </span>
                                            )}
                                    </div>
                                    <div className={styles.row}>
                                        <span className={styles.title}>Sales (1d ago)</span>
                                        {activeCollection?.more_charts?.sales &&
                                            activeCollection?.more_charts?.sales.length > 1 && (
                                                <span className={styles.value}>
                                                    {
                                                        activeCollection?.more_charts?.sales[
                                                            activeCollection?.more_charts?.sales?.length - 2
                                                        ].y
                                                    }
                                                </span>
                                            )}
                                    </div>
                                    <div className={styles.row}>
                                        <span className={styles.title}>Volume (1d ago)</span>
                                        {activeCollection?.more_charts?.volume &&
                                            activeCollection?.more_charts?.volume.length > 1 && (
                                                <span className={styles.value}>
                                                    Ξ
                                                    {
                                                        activeCollection?.more_charts?.volume[
                                                            activeCollection?.more_charts?.volume?.length - 2
                                                        ].y
                                                    }
                                                </span>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <>
                            {activeCollectionNfts && activeCollectionNfts.length > 0 && (
                                <div className={styles['card-expanded']}>
                                    <>
                                        {activeCollectionNfts.map((nft) => (
                                            <img src={nft?.image_url} alt='' />
                                        ))}
                                    </>

                                    {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <button className={styles.button} onClick={() => createSellOrder(nft)}>
                                                Sell
                                            </button>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <img src={nft?.image_url} alt='' />
                                            <button className={styles.button} onClick={() => createSellOrder(nft)}>
                                                Sell
                                            </button>
                                        </div> */}
                                </div>
                            )}
                        </>
                    </>
                    // <>
                    //     {activeCollectionNfts &&
                    //         activeCollectionNfts.length > 0 &&
                    //         activeCollectionNfts.map((nft) => (
                    //             <div className={styles['card-expanded']}>
                    //                 <img src={nft?.image_url} alt='' />
                    //                 <div className={styles.content}>
                    //                     <div className={styles.details}>
                    //                         <div className={styles.row}>
                    //                             <span className={styles.title}>Floor Price</span>
                    //                             {activeCollection?.more_charts?.floor &&
                    //                                 activeCollection?.more_charts?.floor.length > 0 && (
                    //                                     <span className={styles.value}>
                    //                                         Ξ
                    //                                         {
                    //                                             activeCollection?.more_charts?.floor[
                    //                                                 activeCollection?.more_charts?.floor?.length - 1
                    //                                             ].y
                    //                                         }
                    //                                     </span>
                    //                                 )}
                    //                         </div>
                    //                         <div className={styles.row}>
                    //                             <span className={styles.title}>Service Fee</span>
                    //                             <span className={styles.value}>$5.00</span>
                    //                         </div>
                    //                         <div className={styles.row}>
                    //                             <span className={styles.title}>Gas Fee (Est)</span>
                    //                             <span className={styles.value}>
                    //                                 {parseInt(currentGasEstimate).toFixed(3)}
                    //                             </span>
                    //                         </div>
                    //                         <div className={styles.row}>
                    //                             <span className={styles.title}>You'll Receive</span>
                    //                             <span className={styles.value}>$189.55</span>
                    //                         </div>
                    //                     </div>

                    //                     <button className={styles.button} onClick={() => createSellOrder(nft)}>
                    //                         Sell
                    //                     </button>
                    //                 </div>
                    //             </div>
                    //         ))}
                    // </>
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
