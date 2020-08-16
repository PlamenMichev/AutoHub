import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const UserAd = ({ ad }) => {
    return (
        <Card className={styles.card}>
            <Card.Img variant="top" src={ad.photosUrls[0]} />
            <Card.Body>
                <Card.Title>{ad.title}</Card.Title>
                <Card.Text>
                {ad.description || ad.transmission + ' ' + ad.fuelType }
                </Card.Text>
                <Link to={`/ad/${ad._id}`}>
                    <Button variant="primary">See ad</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default UserAd;