import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';
import styles from './index.module.css'

const Spinner = () => {
    return (
    <center>
        <BootstrapSpinner className={styles.spinner} animation='border' role='status' variant='primary'>
            <span className='sr-only'>Loading...</span>
        </BootstrapSpinner>
    </center>)
}

export default Spinner;