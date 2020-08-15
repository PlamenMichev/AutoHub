import React, { Component } from 'react';
import makesService from '../../services/api/makes';
import modelsService from '../../services/api/models';
import styles from './index.module.css';
import SelectInput from '../select-input';
import Input from '../input';
import { Row, Col, Form } from 'react-bootstrap';
import SubmitButton from '../submit-button';
import url from '../../utils/url';
import globalConstants from '../../global-constants';
import { withRouter } from 'react-router-dom';
import SearchContext from '../../search-context';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            make: '',
            model: '',
            minYear: '',
            maxYear: '',
            transmission: '',
            fuelType: '',
            makes: [],
            models: [],
        }
    }

    static contextType = SearchContext;

    getMakes = async () => {
        const makes = await makesService.getMakes();
        this.setState({makes});
    }

    getModels = async (make) => {
        const models = await modelsService.getModels(make);
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

    createUrl = (event) => {
        event.preventDefault();
        const terms = {
            make: this.state.make,
            model: this.state.model,
            minYear: this.state.minYear,
            maxYear: this.state.maxYear,
            transmission: this.state.transmission,
            fuelType: this.state.fuelType,
        };

        const params = url.createGetUrl(terms);
        const requestUrl = `/search?${params}&page=1`;
        this.props.history.push(requestUrl);
    }

    render () {
        const {
            make,
            model,
            minYear,
            maxYear,
            makes,
            models,
            transmission,
            fuelType,
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
                            options={makes}
                            placeholder='all'/>
                    </Col>
                    <Col className={styles['col-center']}>
                        <SelectInput label='Model'
                            id='model'
                            onChange = {(e) => this.onChange(e, 'model')}
                            type='text'
                            value={model !== '' ? model : 'all'}
                            options={models}
                            placeholder='all'/>
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

                <Row>
                    <Col className={styles['col-center']}>
                        <SelectInput label='Transmission'
                            id='transmission'
                            onChange = {(e) => { this.onChange(e, 'transmission'); }}
                            value={transmission}
                            options={globalConstants.transmissions}/>
                    </Col>
                    <Col className={styles['col-center']}>
                        <SelectInput label='Fuel Type'
                            id='fuelType'
                            onChange = {(e) => { this.onChange(e, 'fuelType'); }}
                            value={fuelType}
                            options={globalConstants.fuelTypes}/>
                    </Col>
                </Row>
                <SubmitButton onClick={this.createUrl} title="Search"/>
            </Form>)
    }
}

export default withRouter(SearchForm);