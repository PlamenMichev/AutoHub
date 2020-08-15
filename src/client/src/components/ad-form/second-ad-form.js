import React, { Component } from 'react';
import Input from '../input';
import SelectInput from '../select-input';
import TextareaInput from '../textarea-input';
import styles from './index.module.css';
import SwitchButton from '../switch-button';
import { Row, Col, Form } from 'react-bootstrap';
import FormTitle from '../form-title';
import ErrorMessage from '../error-message';
import globalConstants from '../../global-constants';

class SecondAdForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
        }
    }

    onChange = (event, type) => {
        const newState = {};
        newState[type] = event.target.value;
        this.setState(newState);
    }

    handleLengthBlur = (property, message, minLength, maxLength) => {
        const currentProperty = this.props.values[property];
        const { errors } = this.state;

        if (currentProperty.length < minLength || currentProperty.length > maxLength) {
            if (!errors.includes(message)) {
                this.setState({errors: [...errors, message]});
            }
        } else {
            const newErrorState = errors.filter(function(err) {
                return err !== message
            })
            this.setState({errors: newErrorState});
        }
    }

    handleRangeBlur = (type, message, minValue, maxValue) => {
        const property = this.props.values[type];
        const { errors } = this.state;

        if (property < minValue || property > maxValue) {
            if (!errors.includes(message)) {
                this.setState({errors: [...errors, message]});
            }
        } else {
            const newErrorState = errors.filter(function(err) {
                return err !== message
            })
            this.setState({errors: newErrorState});
        }
    }

    render() {
        const {
            price,
            distanceRun,
            horsepower,
            color,
            description,
            type,
            types,
        } = this.props.values;

        const {
            previousStep,
            nextStep,
            onChange,
        } = this.props;

        const {
            errors,
        } = this.state;
        
        return (
                <Form className={styles.form}>
                    <FormTitle title="Optional ad fields" />
                    <div className={styles['error-container']}>
                        {errors.length !== 0
                        ? <ErrorMessage error={errors[errors.length - 1]}/>
                        : '' }
                    </div>
                    <Row>
                        <Col className={styles['col-center']}>
                            <Input label='Distance Run'
                                    id='distanceRun'
                                    onChange = {(e) => onChange(e, 'distanceRun')}
                                    type='number'
                                    value={distanceRun}
                                    onBlur={() => this.handleRangeBlur('distanceRun', 'Distance Run should be between 1 and 2 000 000 km.', 1, 2000000)}
                                    />
                        </Col>
                        <Col className={styles['col-center']}>
                            <Input label='Price'
                                    id='price'
                                    onChange = {(e) => onChange(e, 'price')}
                                    type='number'
                                    value={price}
                                    onBlur={() => this.handleRangeBlur('price', 'Price should be between 100 and 10 000 000 lv.', 1, 10000000)}
                                    />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={styles['col-center']}>
                            <Input label='Horsepower'
                                    id='horsepower'
                                    onChange = {(e) => onChange(e, 'horsepower')}
                                    type='number'
                                    value={horsepower}
                                    onBlur={() => this.handleRangeBlur('horsepower', 'Horsepower should be between 30 and 1500.', 30, 1500)}
                                    />
                        </Col>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Color'
                                    id='color'
                                    onChange = {(e) => onChange(e, 'color')}
                                    type='text'
                                    value={color}
                                    options={globalConstants.colors}
                                    />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={styles['col-center']}>
                            <TextareaInput label='Description'
                                    id='description'
                                    onChange = {(e) => onChange(e, 'description')}
                                    value={description}
                                    placeholder='Add description...'
                                    rows={4}
                                    onBlur={() => this.handleLengthBlur('description', 'Description should be between 10 and 300 symbols.', 10, 300)}
                                    />
                        </Col>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Type'
                                    id='type'
                                    onChange = {(e) => onChange(e, 'type')}
                                    value={type}
                                    options={types}
                                    />
                        </Col>
                    </Row>
                    
                    <SwitchButton title='Previous' onClick={errors.length === 0 ? nextStep : null}/>
                    <SwitchButton title='Next' onClick={errors.length === 0 ? nextStep : null}/>
                </Form>
            )
        }
}

export default SecondAdForm;