import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import globalConstants from '../../global-constants';
import FoundAds from '../../components/foundAds';
import Spinner from '../../components/spinner';
import adsService from '../../services/api/ads';
import { Pagination } from 'react-bootstrap';
import styles from './index.module.css';
import queryString from 'query-string';
import url from '../../utils/url';


const AdsResult = (props) => {
    const [ads, setAds] = useState(null);
    const [paginationItems, setPaginationItems] = useState([]);
    const [perPage, setPerPage] = useState(3);
    const [page, setPage] = useState(1);
    const [adsCount, setAdsCount] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const handlePageClick = (event) => {
        const pageNumber = +event.target.textContent;
        setLoaded(false);
        const params = queryString.parse(props.location.search);
        params.page = pageNumber;
        props.history.push(`/search?${url.createGetUrl(params)}`)
    }

    const renderPagination = () => {
        const items = [];
        for (let i = 1; i <= Math.ceil(adsCount / perPage); i++) {
            items.push(
                <Pagination.Item key={i} active={i === +page} onClick={handlePageClick}>
                {i}
                </Pagination.Item>
            );
        }

        setPaginationItems(items);
    }

    useEffect(() => {
        const params = queryString.parse(props.location.search);
        const requestParams = url.createGetUrl(params);
        const requestUrl = `${globalConstants.serverUrl}/search?${requestParams}&perPage=${perPage}`;

        if (!loaded) {
            fetch(requestUrl)
            .then(promise => {
                return promise.json();
            })
            .then(response => {
                setAds(response.ads);
                setAdsCount(response.count);
                setPage(params.page);
                setLoaded(true);
            });
        } else {
            renderPagination();
        }
    }, [loaded]);

    if (!ads) {
        return (
            <Spinner />
        )
    }

    return (
        <PageLayout>
            <FoundAds ads={ads} />
            <Pagination className={styles.pagination}>{paginationItems}</Pagination>
        </PageLayout>
    )
}

export default AdsResult;