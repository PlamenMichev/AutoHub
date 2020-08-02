import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import PageHeader from '../../components/page-header';
import Input from '../../components/input';
import FileInput from '../../components/file-input';
import styles from '../common/form.module.css';
import { Form } from 'react-bootstrap';
import SubmitButton from '../../components/submit-button';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            rePassword: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            profilePicture: '',
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
            password,
            rePassword,
            firstName,
            lastName,
            phoneNumber,
            profilePicture,
        } = this.state;

        return (
            <PageLayout>
                <PageHeader title='Register Page'/>
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

                    <Input label='Repeat Password'
                           placeholder='Password again...'
                           id='rePassword'
                           onChange = {(e) => this.onChange(e, 'rePassword')}
                           type='password'
                           value={rePassword}/>
                           
                    <Input label='First Name'
                           placeholder='Your first name...'
                           id='firstName'
                           onChange = {(e) => this.onChange(e, 'firstName')}
                           type='text'
                           value={firstName}/>

                    <Input label='Last Name'
                           placeholder='Your last name...'
                           id='lastName'
                           onChange = {(e) => this.onChange(e, 'lastName')}
                           type='text'
                           value={lastName}/>

                    <Input label='Phone Number (Optional)'
                           placeholder='Your phone number...'
                           id='phoneNumber'
                           onChange = {(e) => this.onChange(e, 'phoneNumber')}
                           type='text'
                           value={phoneNumber}/>

                    <FileInput label='Profile Picture (Optional)'
                           id='profilePicture'
                           onChange = {(e) => this.onChange(e, 'profilePicture')}
                           value={profilePicture}
                           />
    
                    <SubmitButton title="Register"/>
                </Form>
            </PageLayout>
            )
        }
}

export default RegisterPage;