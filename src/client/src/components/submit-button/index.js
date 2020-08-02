import React from 'react';
import { Button } from 'react-bootstrap';
import styles from './index.module.css';

const SubmitButton = ({ title }) => {
    return (
        <Button className={styles['submit-button']}>{title}</Button>)
}

export default SubmitButton;