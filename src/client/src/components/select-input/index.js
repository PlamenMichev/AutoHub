import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './index.module.css';

const SelectInput = ({ id, label, onChange, value, options, placeholder = ''}) => {
    return (
        <Form.Group className={styles.group}>
            <Form.Label className={styles.label} htmlFor={id}>{label}: </Form.Label>
            <Form.Control as="select" custom onChange={onChange} value={value}>
                <option value='' selected>{placeholder}</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </Form.Control>
        </Form.Group>
    );
}

export default SelectInput;