import React, { Component } from 'react';
import Input from '../input';
import SelectInput from '../select-input';
import TextareaInput from '../textarea-input';
import styles from './index.module.css';
import SwitchButton from '../switch-button';
import { Row, Col, Form } from 'react-bootstrap';

class SecondAdForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            price: 0,
            distanceRun: 0,
            horsepower: 0,
            color: '',
            description: '',
            type: '',
            types: ['Hatchback', 'Estate', 'Cabrio', 'SUV', 'Coupe', 'Sedan']
        }
    }

    onChange = (event, type) => {
        const newState = {};
        newState[type] = event.target.value;
        this.setState(newState);
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
        } = this.state;

        return (
                <Form className={styles.form}>

                    <Row>
                        <Col className={styles['col-center']}>
                            <Input label='Distance Run'
                                    id='distanceRun'
                                    onChange = {(e) => this.onChange(e, 'distanceRun')}
                                    type='number'
                                    value={distanceRun}
                                    />
                        </Col>
                        <Col className={styles['col-center']}>
                            <Input label='Price'
                                    id='price'
                                    onChange = {(e) => this.onChange(e, 'price')}
                                    type='number'
                                    value={price}
                                    />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={styles['col-center']}>
                            <Input label='Horsepower'
                                    id='horsepower'
                                    onChange = {(e) => this.onChange(e, 'horsepower')}
                                    type='number'
                                    value={horsepower}
                                    />
                        </Col>
                        <Col className={styles['col-center']}>
                            <Input label='Color'
                                    id='color'
                                    onChange = {(e) => this.onChange(e, 'color')}
                                    type='text'
                                    value={color}
                                    />
                        </Col>
                    </Row>

                    <Row>
                        <Col className={styles['col-center']}>
                            <TextareaInput label='Description'
                                    id='description'
                                    onChange = {(e) => this.onChange(e, 'description')}
                                    value={description}
                                    placeholder='Add description...'
                                    rows={4}
                                    />
                        </Col>
                        <Col className={styles['col-center']}>
                            <SelectInput label='Type'
                                    id='type'
                                    onChange = {(e) => this.onChange(e, 'type')}
                                    value={type}
                                    options={types}
                                    />
                        </Col>
                    </Row>
                    
                    <SwitchButton title='Previous'/>
                    <SwitchButton title='Next'/>
                </Form>
            )
        }
}

export default SecondAdForm;