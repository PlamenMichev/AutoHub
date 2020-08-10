import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import globalConstants from '../../global-constants';
import FoundAds from '../../components/foundAds';

const AdsResult = (props) => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const params = props.location.search;
        const requestUrl = `${globalConstants.serverUrl}/search${params}`;

        fetch(requestUrl)
        .then(promise => {
            return promise.json();
        })
        .then(response => {
            setAds(response);
        });
    }, []);

    return (
        <PageLayout>
            <FoundAds ads={ads} />
        </PageLayout>
    )
}

export default AdsResult;