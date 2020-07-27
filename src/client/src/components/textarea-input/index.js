import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './index.module.css';

const TextareaInput = ({ id, label, placeholder, onChange, value, rows}) => {
    return (
        <Form.Group className={styles.group}>
            <Form.Label className={styles.label} htmlFor={id}>{label}: </Form.Label>
            <Form.Control className={styles.textarea}
                as='textarea' 
                placeholder={placeholder}
                rows={rows}
                id={id}
                label='Add file here...'
                onChange={onChange}
                value={value}
            />
        </Form.Group>
    );
}

export default TextareaInput;