import React from 'react';
import styles from './index.module.css';
import { Row, Col } from 'react-bootstrap';

const UserInfo = ({ imageUrl, email, phoneNumber }) => {
    return (
        <div className={styles.container}>
            <img className={styles.image} src={imageUrl} title='Profile picture' />
            <div className={styles.info}>
                <div className={styles['info-row']}>
                    <span className={styles.property}> 
                        <b>Email:</b> {email}
                    </span>
                    <span className={styles.property}> 
                        <b>Phone Number:</b> {phoneNumber || 'None'}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;