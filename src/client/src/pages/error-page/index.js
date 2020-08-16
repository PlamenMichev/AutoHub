import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import PageLayout from '../../components/page-layout';

const ErrorPage = () => {
    return (
        <PageLayout>
            <div className={styles.mainbox}>
                <div className={styles.err}>404</div>
                <div className={styles.msg}>Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
                <p>Let's go 
                <Link to='/'>home</Link> and try from there.</p></div>
            </div>
        </PageLayout>
    )
}

export default ErrorPage;