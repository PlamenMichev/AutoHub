import React, { useContext } from 'react';
import SwitchButton from '../switch-button';
import FormTitle from '../form-title';
import styles from './index.module.css';
import { Row } from 'react-bootstrap';
import SubmitCol from '../submit-ad-column';
import SubmitButton from '../submit-button';
import adsService from '../../services/api/ads';
import { withRouter } from 'react-router-dom';
import globalConstants from '../../global-constants';
import UserContext from '../../user-context';

const SubmitPannel = ({ previousStep, values, showError, history }) => {
    const context = useContext(UserContext);
    const {
        title,
        make,
        model,
        transmission,
        fuelType,
        manufactureMonth,
        manufactureYear,
        price,
        distanceRun,
        horsepower,
        color,
        description,
        type,
        photos,
    } = values;

    const submitForm = async () => {
        const body = {
            title,
            make,
            model,
            transmission,
            fuelType,
            manufactureDate: new Date(manufactureYear, globalConstants.months.indexOf(manufactureMonth), 1),
            price,
            distanceRun,
            horsepower,
            color,
            description,
            type,
            photos,
            userId: context.user.id,
        };
        
        await adsService.CreateAd(body,
            () => {
                history.push('/');
            },
            (error) => showError(error));
    }

    return (
        <div className={styles.form}>
            <FormTitle title="Review your ad" />
            <Row>
                <SubmitCol label='Title' value={title}/>
                <SubmitCol label='Transmission' value={transmission}/>
            </Row>
            <Row>
                <SubmitCol label='Make' value={make}/>
                <SubmitCol label='Model' value={model}/>
            </Row>
            <Row>
                <SubmitCol label='Fuel Type' value={fuelType}/>
                <SubmitCol label='Manufacture Date' value={manufactureYear + ' ' + manufactureMonth}/>
            </Row>
            <Row>
                <SubmitCol label='Price' value={price === '' ? 'Not filled' : price}/>
                <SubmitCol label='Distance Run' value={distanceRun === '' ? 'Not filled' : distanceRun}/>
            </Row>
            <Row>
                <SubmitCol label='Horsepower' value={horsepower === '' ? 'Not filled' : horsepower}/>
                <SubmitCol label='Color' value={color === '' ? 'Not filled' : color}/>
            </Row>
            <Row>
                <SubmitCol label='Description' value={description === '' ? 'Not filled' : description}/>
                <SubmitCol label='Type' value={type === '' ? 'Not filled' : type}/>
            </Row>
            <SwitchButton title='Previous' onClick={previousStep} />
            <SubmitButton title='Submit Form' onClick={submitForm} />
        </div>
    )
}

export default withRouter(SubmitPannel);