import React, { Component } from 'react';
import api from '../../services/api';
import Input from '../input';
import SelectInput from '../select-input';
import FileInput from '../file-input';
import styles from './index.module.css';
import SwitchButton from '../switch-button';
import { Row, Col, Form } from 'react-bootstrap';

class FirstAdForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            make: '',
            model: '',
            fuelType: '',
            transmission: '',
            manufactureMonth: '',
            manufactureMonths: [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ],
            manufactureYear: 2020,
            photos: '',
            makes: [],
            models: [],
            fuelTypes: ['Diesel', 'Gasoline', 'Gas', 'Electric', 'Hybrid'],
            transmissions: ['Manual', 'Automatic'],
        }
    }

    getMakes = async () => {
        const makes = await api.getMakes();
        this.setState({makes});
    }

    getModels = async (make) => {
        const models = await api.getModels(make);
        this.setState({models});
    }

    componentDidMount() {
        this.getMakes();
    }

    onChange = (event, type) => {
        const newState = {};
        newState[type] = event.target.value;
        this.setState(newState);
    }

    render() {
        const {
            title,
            make,
            model,
            makes,
            models,
            transmission,
            transmissions,
            fuelType,
            fuelTypes,
            manufactureMonth,
            manufactureMonths,
            manufactureYear,
            photos,
        } = this.state;

        return (
                <Form className={styles.form}>
                    <Row>
                        <Col className={styles['col-center']}>
                            <Input label='Title'
                                placeholder='Ad title...'
                                id='title'
                                onChange = {(e) => this.onChange(e, 'title')}
                                type='text'
                                value={title}/>
                        </Col>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Transmission'
                                    id='transmission'
                                    onChange = {(e) => this.onChange(e, 'transmission')}
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
                                    this.onChange(e, 'make');
                                    this.getModels(makeValue);
                                }}
                                value={make}
                                options={makes}/>
                        </Col>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Model'
                                id='model'
                                onChange = {(e) => this.onChange(e, 'model')}
                                type='text'
                                value={model}
                                options={models}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Manufacture Month'
                                id='manufactureMonth'
                                onChange = {(e) => this.onChange(e, 'manufactureMonth')}
                                value={manufactureMonth}
                                options={manufactureMonths}/>
                        </Col>
                        <Col className={styles['col-center']}>
                            <Input label='Manufacture Year'
                                            id='manufactureYear'
                                            onChange = {(e) => this.onChange(e, 'manufactureYear')}
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
                                onChange = {(e) => this.onChange(e, 'fuelType')}
                                value={fuelType}
                                options={fuelTypes}/>
                        </Col>
                        <Col className={styles['col-center']}>
                            <FileInput label='Photos'
                                    id='photos'
                                    onChange = {(e) => this.onChange(e, 'photos')}
                                    value={photos}
                                    multiple={true}
                                    />
                        </Col>
                    </Row>
                    <SwitchButton title='Next'/>
                </Form>
            )
        }
}

export default FirstAdForm;