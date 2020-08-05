import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import PageHeader from '../../components/page-header';
import authService from '../../services/api/auth';
import Input from '../../components/input';
import styles from '../common/form.module.css';
import { Form } from 'react-bootstrap';
import SubmitButton from '../../components/submit-button';
import UserContext from '../../Context';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
        }
    }

    static contextType = UserContext;

    onChange = (event, type) => {
        const newState = {};
        newState[type] = event.target.value;
        this.setState(newState);
    }

    submitForm = async (event) => {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
        }

        await authService.login(data,
            (user) => {
                this.context.logIn(user);
                this.props.history.push('/');
            },
            async (e) => {
                this.setState({error: e});
            })

        
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        return (
            <PageLayout>
                <PageHeader title='Login Page'/>
                <div>{error}</div>
                <Form className={styles.form} onSubmit={this.submitForm}>
                    <Input label='Email'
                           placeholder='Your email...'
                           id='email'
                           onChange = {(e) => this.onChange(e, 'email')}
                           type='text'
                           value={email}/>

                    <Input label='Password'
                           placeholder='Your password...'
                           id='password'
                           onChange = {(e) => this.onChange(e, 'password')}
                           type='password'
                           value={password}/>
    
                    <SubmitButton title="Login"/>
                </Form>
            </PageLayout>
            )
        }
}

export default LoginPage;