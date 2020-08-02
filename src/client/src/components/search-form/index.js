import React, { Component } from 'react';
import api from '../../services/api'
import styles from './index.module.css';
import SelectInput from '../select-input';
import { Row, Col, Form } from 'react-bootstrap';
import SubmitButton from '../submit-button';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            make: '',
            model: '',
            makes: [],
            models: [],
        }
    }

    getMakes = async () => {
        const makes = await api.getMakes();
        makes.unshift('all');
        this.setState({makes});
    }

    getModels = async (make) => {
        const models = await api.getModels(make);
        models.unshift('all');
        this.setState({model: ''});
        this.setState({models});
    }

    componentDidMount() {
        this.getMakes();
        this.getModels();
    }

    onChange = (event, type) => {
        const newState = {};
        newState[type] = event.target.value;
        this.setState(newState);
    }

    render () {
        const {
            make,
            model,
            makes,
            models,
        } = this.state;

        return  (
        <Form className={styles.form}>
            <h2 className={styles.header}>Search Cars</h2>
            <Row>
                <Col className={styles['col-center']}>
                    <SelectInput label='Make'
                        id='make'
                        onChange = {(e) => { 
                            const makeValue = e.target.value;
                            this.onChange(e, 'make');
                            this.getModels(makeValue);
                        }}
                        value={make !== '' ? make : 'all'}
                        options={makes}/>
                </Col>
                <Col className={styles['col-center']}>
                    <SelectInput label='Model'
                        id='model'
                        onChange = {(e) => this.onChange(e, 'model')}
                        type='text'
                        value={model !== '' ? model : 'all'}
                        options={models}/>
                </Col>
            </Row>
            <SubmitButton title="Search"/>
        </Form>)
    }
}

export default SearchForm;