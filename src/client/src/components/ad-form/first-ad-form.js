import React, { Component } from 'react';
import makesService from '../../services/api/makes';
import modelsService from '../../services/api/models';
import Input from '../input';
import SelectInput from '../select-input';
import FileInput from '../file-input';
import styles from './index.module.css';
import SwitchButton from '../switch-button';
import { Row, Col, Form } from 'react-bootstrap';
import FormTitle from '../form-title';
import ErrorMessage from '../error-message';

class FirstAdForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            makes: [],
            models: [],
            errors: [],
        }
    }

    getMakes = async () => {
        const makes = await makesService.getMakes();
        this.setState({makes});
    }

    getModels = async (make) => {
        const models = await modelsService.getModels(make);
        this.setState({models});
    }

    handleLengthBlur = (property, message, minLength, maxLength) => {
        // const { email } = this.props.values;
        // console.log(email);
        // const isValid = /\S+@\S+\.\S+/.test(email);
        // console.log(isValid);
        // if (!isValid) {
        //     this.setState({error: 'Email is invalid!'});
        // } else {
        //     this.setState({error: ''});
        // }

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

    handleRequiredBlur = (property, message) => {
        const currentProperty = this.props.values[property];
        const { errors } = this.state;
        if (currentProperty === '') {
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

    componentDidMount() {
        this.getMakes();
        const { make } = this.props.values;

        if (make) {
            this.getModels(make);
        }
    }

    componentDidUpdate() {
        this.getMakes();
    }

    render() {
        const {
            title,
            make,
            model,
            transmission,
            transmissions,
            fuelType,
            fuelTypes,
            manufactureMonth,
            manufactureMonths,
            manufactureYear,
        } = this.props.values;

        const {
            onChange,
            nextStep,
            onFileChange
        } = this.props;

        const {
            models,
            makes,
            errors,
        } = this.state;


        return (
                <Form className={styles.form}>
                    <FormTitle title="Required ad fields" />
                    <div className={styles['error-container']}>
                        {errors.length !== 0
                        ? <ErrorMessage error={errors[errors.length - 1]}/>
                        : '' }
                    </div>
                    <Row>
                        <Col className={styles['col-center']}>
                            <Input label='Title'
                                placeholder='Ad title...'
                                id='title'
                                onChange = {(e) => onChange(e, 'title')}
                                type='text'
                                value={title}
                                onBlur={() => this.handleLengthBlur('title', 'Title should be between 3 and 15 symbols.', 3, 15)}
                                />
                        </Col>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Transmission'
                                    id='transmission'
                                    onChange = {(e) => onChange(e, 'transmission')}
                                    value={transmission}
                                    options={transmissions}
                                    onBlur={() => this.handleRequiredBlur('transmission', 'Transmission is required.')}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Make'
                                id='make'
                                onChange = {(e) => { 
                                    const makeValue = e.target.value;
                                    onChange(e, 'make');
                                    this.getModels(makeValue);
                                }}
                                value={make}
                                options={makes}
                                onBlur={() => this.handleRequiredBlur('make', 'Make is required.')}/>
                        </Col>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Model'
                                id='model'
                                onChange = {(e) => onChange(e, 'model')}
                                type='text'
                                value={model}
                                options={models}
                                onBlur={() => this.handleRequiredBlur('model', 'Model is required.')}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Manufacture Month'
                                id='manufactureMonth'
                                onChange = {(e) => onChange(e, 'manufactureMonth')}
                                value={manufactureMonth}
                                options={manufactureMonths}
                                onBlur={() => this.handleRequiredBlur('manufactureMonth', 'Manufacture month is required.')}/>
                        </Col>
                        <Col className={styles['col-center']}>
                            <Input label='Manufacture Year'
                                            id='manufactureYear'
                                            onChange = {(e) => onChange(e, 'manufactureYear')}
                                            value={manufactureYear}
                                            type='number'
                                            min={1900}
                                            max={2021}
                                            step={1}
                                            onBlur={() => this.handleRequiredBlur('manufactureYear', 'Manufacture year is required.')}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Fuel Type'
                                id='fuelType'
                                onChange = {(e) => onChange(e, 'fuelType')}
                                value={fuelType}
                                options={fuelTypes}
                                onBlur={() => this.handleRequiredBlur('fuelType', 'Fuel Type is required.')}/>
                        </Col>
                        <Col className={styles['col-center']}>
                            <FileInput label='Photos'
                                    id='photos'
                                    onChange = {(e) => onFileChange(e, 'photos')}
                                    multiple={true}
                                    onBlur={() => this.handleLengthBlur('photos', 'At least one photo is required.', 3, 15)}/>
                        </Col>
                    </Row>
                    <SwitchButton title='Next' onClick={errors.length === 0 ? nextStep : null}/>
                </Form>
            )
        }
}

export default FirstAdForm;