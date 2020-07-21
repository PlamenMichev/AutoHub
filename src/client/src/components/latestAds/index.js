import React, { Component } from 'react';
import styles from './index.module.css';
import LatestAd from '../latestAd';

class LatestAds extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ads: [],
        }
    }

    getLatestAds = async () => {
        const promise = await fetch('http://localhost:3001/ads/getLatest');
        const ads = await promise.json();

        this.setState({ ads });
    }

    componentDidMount() {
        this.getLatestAds();
    }

    renderLatestAds = () => {
        const { ads } = this.state;

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
                <LatestAd key={ad._id} adInfo={adInfo}>
                    {ad.title}
                </LatestAd>
            )
        });
    }

    render() {
        return (
            <div className={styles.wrapper}>
                {this.renderLatestAds()}
            </div>
        );
    }
}

export default LatestAds;