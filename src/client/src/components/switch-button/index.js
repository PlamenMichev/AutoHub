import React from 'react';
import styles from './index.module.css';
import { Button } from 'react-bootstrap';

const SwitchButton = ({ title, onClick }) => {
    console.log(title);
    return (
        <Button className={styles[title.toLowerCase()]}>{title}</Button>
    )
}

export default SwitchButton;