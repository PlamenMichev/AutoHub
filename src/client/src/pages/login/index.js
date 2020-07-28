import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import PageHeader from '../../components/page-header';
import Input from '../../components/input';
import styles from '../common/form.module.css';
import { Button, Form } from 'react-bootstrap';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }
    }

    onChange = (event, type) => {
        const newState = {};
        newState[type] = event.target.value;
        this.setState(newState);
    }

    render() {
        const {
            email,
            password
        } = this.state;

        return (
            <PageLayout>
                <PageHeader title='Login Page'/>
                <Form className={styles.form}>
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
    
                    <Button className={styles['submit-button']}>Submit</Button>
                </Form>
            </PageLayout>
            )
        }
}

export default LoginPage;