import React, { Component } from 'react';
import styles from './index.module.css';
import LatestAd from '../latestAd';
import Spinner from '../spinner';
import globalConstants from '../../global-constants';

class LatestAds extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ads: [],
            loading: true,
        }
    }

    getLatestAds = async () => {
        const promise = await fetch(`${globalConstants.serverUrl}/ads/getLatest`);
        const ads = await promise.json();

        if (ads.length === 0) {
            this.setState({ ads, loading: false });
            return <h2>No Latest Ads</h2>
        }

        this.setState({ ads, loading: false });
    }

    componentDidMount() {
        this.getLatestAds();
    }

    renderLatestAds = () => {
        const { ads } = this.state;

        if (ads.length === 0) {
            return <h2>No Latest Ads</h2>
        }

        return ads.map(ad => {
            const adInfo = {
                title: [ad.title],
                description: [ad.description],
                make: [ad.make],
                model: [ad.model],
                price: [ad.price],
                createdOn: [ad.createdOn],
                type: [ad.type],
                photosUrls: [ad.photosUrls[0]],
            }

            return (
                <LatestAd key={ad._id} adInfo={adInfo} />
            )
        });
    }

    render() {
        const { loading } = this.state;
        return (
            <div className={styles.wrapper}>
                <h2 className={styles.header}>Laterst Ads:</h2>
                { loading ? <Spinner /> : this.renderLatestAds() }
            </div>
        );
    }
}

export default LatestAds;