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
            error: null,
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

    handleEmailBlur = () => {
        // const { email } = this.props.values;
        // console.log(email);
        // const isValid = /\S+@\S+\.\S+/.test(email);
        // console.log(isValid);
        // if (!isValid) {
        //     this.setState({error: 'Email is invalid!'});
        // } else {
        //     this.setState({error: ''});
        // }

        const { title } = this.props.values;
        if (title.length < 3 || title.length > 15) {
            this.setState({error: 'Titile length is not valid.'});
        } else {
            this.setState({error: null});
        }
    }

    componentDidMount() {
        this.getMakes();
        const { make } = this.props.values;

        if (make) {
            this.getModels(make);
        }
    }

    componentDidUpdateasdf() {
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
            photos,
        } = this.props.values;

        const {
            onChange,
            nextStep,
            onFileChange
        } = this.props;

        const {
            models,
            makes,
            error,
        } = this.state;

        return (
                <Form className={styles.form}>
                    <FormTitle title="Required ad fields" />
                    <div className={styles['error-container']}>
                        {error 
                        ? <ErrorMessage error={error}/>
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
                                onBlur={this.handleEmailBlur}
                                />
                        </Col>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Transmission'
                                    id='transmission'
                                    onChange = {(e) => onChange(e, 'transmission')}
                                    value={transmission}
                                    options={transmissions}/>
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
                                options={makes}/>
                        </Col>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Model'
                                id='model'
                                onChange = {(e) => onChange(e, 'model')}
                                type='text'
                                value={model}
                                options={models}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Manufacture Month'
                                id='manufactureMonth'
                                onChange = {(e) => onChange(e, 'manufactureMonth')}
                                value={manufactureMonth}
                                options={manufactureMonths}/>
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
                                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Fuel Type'
                                id='fuelType'
                                onChange = {(e) => onChange(e, 'fuelType')}
                                value={fuelType}
                                options={fuelTypes}/>
                        </Col>
                        <Col className={styles['col-center']}>
                            <FileInput label='Photos'
                                    id='photos'
                                    onChange = {(e) => onFileChange(e, 'photos')}
                                    multiple={true}
                                    />
                        </Col>
                    </Row>
                    <SwitchButton title='Next' onClick={nextStep}/>
                </Form>
            )
        }
}

export default FirstAdForm;