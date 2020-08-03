import React, { Component } from 'react';
import makesService from '../../services/api/makes';
import modelsService from '../../services/api/models';
import styles from './index.module.css';
import SelectInput from '../select-input';
import Input from '../input';
import { Row, Col, Form } from 'react-bootstrap';
import SubmitButton from '../submit-button';
import url from '../../utils/url';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            make: '',
            model: '',
            minYear: '',
            maxYear: '',
            makes: [],
            models: [],
        }
    }

    getMakes = async () => {
        const makes = await makesService.getMakes();
        makes.unshift('all');
        this.setState({makes});
    }

    getModels = async (make) => {
        const models = await modelsService.getModels(make);
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

    createUrl = () => {
        const terms = {
            make: this.state.make,
            model: this.state.model,
            minYear: this.state.minYear,
            maxYear: this.state.maxYear,
        };

        const params = url.createGetUrl(terms);
        const requestUrl = `http://localhost:3001/search?${params}`;
    }

    render () {
        const {
            make,
            model,
            minYear,
            maxYear,
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

            <Row>
                <Col className={styles['col-center']}>
                    <Input label='From'
                        id='minYear'
                        onChange = {(e) => { this.onChange(e, 'minYear'); }}
                        value={minYear}
                        placeholder={2020}
                        type='number'/>
                </Col>
                <Col className={styles['col-center']}>
                    <Input label='To'
                            id='maxYear'
                            onChange = {(e) => { this.onChange(e, 'maxYear'); }}
                            value={maxYear}
                            placeholder={2020}
                            type='number'/>
                </Col>
            </Row>

            <SubmitButton onClick={this.createUrl} title="Search"/>
        </Form>)
    }
}

export default SearchForm;