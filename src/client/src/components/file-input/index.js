import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './index.module.css';

const FileInput = ({ id, label, onChange, value, multiple}) => {
    return (
        <Form.Group className={styles.group}>
            <Form.Label className={styles.label} htmlFor={id}>{label}: </Form.Label>
            <Form.File 
                id={id}
                label='Add files...'
                onChange={onChange}
                value={value}
                multiple={multiple}
                custom
            />
        </Form.Group>
    );
}

export default FileInput;