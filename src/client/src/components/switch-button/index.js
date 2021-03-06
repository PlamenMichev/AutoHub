import React from 'react';
import styles from './index.module.css';
import { Button } from 'react-bootstrap';

const SwitchButton = ({ title, onClick }) => {
    return (
        <Button onClick={onClick} className={styles[title.toLowerCase()]}>{title}</Button>
    )
}

export default SwitchButton;