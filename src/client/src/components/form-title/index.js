import React from 'react';
import styles from './index.module.css';

const FormTitle = ({ title }) => {
    return (
        <h3 className={styles.header}>{title}</h3>)
}

export default FormTitle;