import React from 'react';
import styles from './index.module.css';

const PageHeader = ({ title }) => {
    return (
        <h1 className={styles.header}>{title}</h1>
    )
}

export default PageHeader;