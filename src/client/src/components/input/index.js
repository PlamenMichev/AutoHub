import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './index.module.css';

const Input = ({ id, label, placeholder, type, onChange, value, min, max, step, onBlur}) => {
    return (
        <Form.Group className={styles.group}>
            <Form.Label className={styles.label} htmlFor={id}>{label}: </Form.Label>
            <Form.Control onBlur={onBlur} min={min} max={max} step={step} type={type} placeholder={placeholder} onChange={onChange} value={value}/>
        </Form.Group>
    );
}

export default Input;