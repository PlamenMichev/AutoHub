import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import PageHeader from '../../components/page-header';
import Input from '../../components/input';
import SelectInput from '../../components/select-input';
import FileInput from '../../components/file-input';
import TextareaInput from '../../components/textarea-input';
import styles from '../common/login-register.module.css';
import specificStyles from './index.module.css';
import { Button, Row, Col, Form } from 'react-bootstrap';

class CreateAd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            make: '',
            model: '',
            price: 0,
            fuelType: '',
            transmission: '',
            distanceRun: 0,
            manufactureMonth: '',
            manufactureMonths: [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ],
            manufactureYear: 2020,
            horsepower: 0,
            color: '',
            description: '',
            type: '',
            photos: '',
            makes: [],
            models: [],
            fuelTypes: ['Diesel', 'Gasoline', 'Gas', 'Electric', 'Hybrid'],
            transmissions: ['Manual', 'Automatic'],
            types: ['Hatchback', 'Estate', 'Cabrio', 'SUV', 'Coupe', 'Sedan']
        }
    }

    getMakes = async () => {
        const promise = await fetch('http://localhost:3001/makes/all');
        if (promise.status != 200) {
            this.setState({makes: []});
        } else {
            const makes = await promise.json();
            this.setState({makes});
        }
    }

    getModels = async (make) => {
        const promise = await fetch(`http://localhost:3001/models?make=${make}`);

        if (promise.status != 200) {
            this.setState({models: []});
        } else {
            const models = await promise.json();
            this.setState({models});
        }
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
            price,
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
            distanceRun,
            horsepower,
            color,
            description,
            type,
            types,
            photos,
        } = this.state;

        return (
            <PageLayout>
                <PageHeader title='Create New Ad'/>
                <Form className={specificStyles.form}>
                    <Row>
                        <Col>
                            <Input label='Title'
                                placeholder='Ad title...'
                                id='title'
                                onChange = {(e) => this.onChange(e, 'title')}
                                type='text'
                                value={title}/>
                        </Col>
                        <Col>
                            <Input label='Price'
                                placeholder='Car price...'
                                id='price'
                                onChange = {(e) => this.onChange(e, 'price')}
                                type='number'
                                value={price}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <SelectInput label='Make'
                                id='make'
                                onChange = {(e) => { 
                                    const makeValue = e.target.value;
                                    this.onChange(e, 'make');
                                    if (makeValue) {
                                        this.getModels(makeValue);
                                    } else {
                                        this.setState({models: []});
                                    }
                                }}
                                value={make}
                                options={makes}/>
                        </Col>
                        <Col>
                            <SelectInput label='Model'
                                id='model'
                                onChange = {(e) => this.onChange(e, 'model')}
                                type='text'
                                value={model}
                                options={models}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <SelectInput label='Transmission'
                                id='transmission'
                                onChange = {(e) => this.onChange(e, 'transmission')}
                                value={transmission}
                                options={transmissions}/>
                        </Col>
                        <Col>
                            <SelectInput label='Fuel Type'
                                id='fuelType'
                                onChange = {(e) => this.onChange(e, 'fuelType')}
                                value={fuelType}
                                options={fuelTypes}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <SelectInput label='Manufacture Month'
                                        id='manufactureMonth'
                                        onChange = {(e) => this.onChange(e, 'manufactureMonth')}
                                        value={manufactureMonth}
                                        options={manufactureMonths}/>
                                </Col>
                                <Col>
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
                        </Col>
                        <Col>
                            <Input label='Distance Run'
                                    id='distanceRun'
                                    onChange = {(e) => this.onChange(e, 'distanceRun')}
                                    type='number'
                                    value={distanceRun}
                                    />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Input label='Horsepower'
                                    id='horsepower'
                                    onChange = {(e) => this.onChange(e, 'horsepower')}
                                    type='number'
                                    value={horsepower}
                                    />
                        </Col>
                        <Col>
                            <Input label='Color'
                                    id='color'
                                    onChange = {(e) => this.onChange(e, 'color')}
                                    type='text'
                                    value={color}
                                    />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <TextareaInput label='Description (Optional)'
                                    id='description'
                                    onChange = {(e) => this.onChange(e, 'description')}
                                    value={description}
                                    placeholder='Add description...'
                                    rows={4}
                                    />
                        </Col>
                        <Col>
                            <SelectInput label='Type'
                                    id='type'
                                    onChange = {(e) => this.onChange(e, 'type')}
                                    value={type}
                                    options={types}
                                    />
                        </Col>
                    </Row>

                    <Row>
                        <FileInput label='Photos'
                                id='photos'
                                onChange = {(e) => this.onChange(e, 'photos')}
                                value={photos}
                                multiple={true}
                                />
                    </Row>
                    <Button className={styles['submit-button']}>Submit</Button>
                </Form>
            </PageLayout>
            )
        }
}

export default CreateAd;