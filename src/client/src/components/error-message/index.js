import React from 'react';
import { Alert } from 'react-bootstrap';
import styles from './index.module.css';

const ErrorMessage = ({ error }) => {
    return (<Alert variant='danger' className={styles.alert}>
        { error }
    </Alert>)
}

export default ErrorMessage;