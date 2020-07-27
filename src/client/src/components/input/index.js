import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './index.module.css';

const Input = ({ id, label, placeholder, type, onChange, value}) => {
    return (
        <Form.Group className={styles.group}>
            <Form.Label className={styles.label} htmlFor={id}>{label}: </Form.Label>
            <Form.Control type={type} placeholder={placeholder} onChange={onChange} value={value}/>
        </Form.Group>
    );
}

export default Input;