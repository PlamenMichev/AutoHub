import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import PageHeader from '../../components/page-header';
import Input from '../../components/input';
import FileInput from '../../components/file-input';
import styles from '../common/form.module.css';
import { Form } from 'react-bootstrap';
import SubmitButton from '../../components/submit-button';
import UserContext from '../../Context';

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
            error: '',
        }
    }

    static contextType = UserContext;

    onChange = (event, type) => {
        const newState = {};
        newState[type] = event.target.value;
        this.setState(newState);
    }

    onFileChange = (event, type) => {
        const newState = {};
        newState[type] = event.target.files[0];
        this.setState(newState);
    }

    submitForm = async (event) => {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            profilePicture: this.state.profilePicture,
        }

        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        const promise = await fetch('http://localhost:3001/users/register', {
            method: 'POST',
            body: formData,
        });

        const response = await promise.json();

        if (promise.status > 300) {
            this.setState({error: await response.message})
        } else {
            const authToken = promise.headers.get('auth');
            document.cookie = `auth=${authToken}`;
            // this.context.logIn();
            this.props.history.push('/');
        }
    }

    render() {
        const {
            email,
            password,
            rePassword,
            firstName,
            lastName,
            phoneNumber,
            error,
        } = this.state;

        return (
            <PageLayout>
                <PageHeader title='Register Page'/>
                <p>{error}</p>
                <Form className={styles.form} onSubmit={this.submitForm}>
                    <Input label='Email'
                           placeholder='Your email...'
                           id='email'
                           onChange = {(e) => this.onChange(e, 'email')}
                           type='email'
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
                           onChange = {(e) => this.onFileChange(e, 'profilePicture')}
                           />
    
                    <SubmitButton title="Register"/>
                </Form>
            </PageLayout>
            )
        }
}

export default RegisterPage;