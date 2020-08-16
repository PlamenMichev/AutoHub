import React from 'react';
import styles from './index.module.css';

const UserInfo = ({ user }) => {
    return (
        <div className={`${styles.wrapper}`}>
            <h3>Ad Placer Info</h3>
            <hr />
            <div className='row'>
                <div className={`col-md-4`}>
                    <img src={user.imageUrl} alt='user image' className={styles.image} />
                </div>
                <div className={`col-md-8`}>
                    <p className={styles.userInfo}>{user.firstName + ' ' + user.lastName}</p>
                    <p className={styles.userInfo}>Email: {user.email}</p>
                    <p className={styles.userInfo}>Phone Number: {user.phoneNumber !== '' ? user.phoneNumber : 'Not filled'}</p>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;