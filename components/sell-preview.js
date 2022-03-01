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
                            <span className={styles.title}>Service Fee</span>
                            <span className={styles.value}>$5.00</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.title}>Gas Fee (Est)</span>
                            <span className={styles.value}>{parseInt(currentGasEstimate).toFixed(3)}</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.title}>You'll Receive</span>
                            <span className={styles.value}>$189.55</span>
                        </div>
                    </div>

                    <button className={styles.button} onClick={() => createSellOrder(nft)}>
                        Sell
                    </button>
                </div>
            </div>
        ))}
</>;
