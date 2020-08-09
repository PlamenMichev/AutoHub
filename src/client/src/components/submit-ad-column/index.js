import React from 'react';
import styles from './index.module.css';
import { Col } from 'react-bootstrap';

const SubmitCol = ({ label, value}) => {
    return (
        <Col className={styles['col-submit-center']}>
            <div>
                <span className={styles.value}>{label} - {value}</span>
            </div>
        </Col>
    );
}

export default SubmitCol;