import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import PageHeader from '../../components/page-header';
import Input from '../../components/input';
import FileInput from '../../components/file-input';
import styles from '../common/form.module.css';
import { Form } from 'react-bootstrap';
import SubmitButton from '../../components/submit-button';
import UserContext from '../../user-context';
import authService from '../../services/api/auth';
import ErrorMessage from '../../components/error-message';

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
            errors: [],
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

    handleEmailBlur = (message) => {
        const { email } = this.state;
        const isValid = /\S+@\S+\.\S+/.test(email);
        const errors = this.state.errors;
        if (!isValid) {
            if (!errors.includes(message)) {
                this.setState({errors: [...errors, message]});
            }
        } else {
            const newErrorState = errors.filter(function(err) {
                return err !== message
            })
            this.setState({errors: newErrorState});
        }
    }

    handlePasswordBlur = (message) => {
        const { password } = this.state;

        const errors = this.state.errors;
        if (password.length < 3 || password.length > 20) {
            if (!errors.includes(message)) {
                this.setState({errors: [...errors, message]});
            }
        } else {
            const newErrorState = errors.filter(function(err) {
                return err !== message
            })
            this.setState({errors: newErrorState});
        }
    }

    handleRePasswordBlur = (message) => {
        const { password, rePassword } = this.state;

        const errors = this.state.errors;
        if (rePassword !== password) {
            if (!errors.includes(message)) {
                this.setState({errors: [...errors, message]});
            }
        } else {
            const newErrorState = errors.filter(function(err) {
                return err !== message
            })
            this.setState({errors: newErrorState});
        }
    }

    handleNameBlur = (name, message) => {
        const property = this.state[name];

        const errors = this.state.errors;
        if (property.length < 2 || property.length > 20) {
            if (!errors.includes(message)) {
                this.setState({errors: [...errors, message]});
            }
        } else {
            const newErrorState = errors.filter(function(err) {
                return err !== message
            })
            this.setState({errors: newErrorState});
        }
    }

    handlePhoneNumberBlur = (message) => {
        const { phoneNumber } = this.state;
        const isOnlyDigits = /^[0-9]+$/.test(phoneNumber);
        const errors = this.state.errors;
        if ((phoneNumber.length < 9 || phoneNumber.length > 15) || !isOnlyDigits) {
            if (!errors.includes(message)) {
                this.setState({errors: [...errors, message]});
            }
        } else {
            const newErrorState = errors.filter(function(err) {
                return err !== message
            })
            this.setState({errors: newErrorState});
        }
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

        await authService.register(data,
        (user) => {
            this.context.logIn(user);
            this.props.history.push('/');
        },
        (error) => {
            this.setState({errors: 'Invalid data!'})
        })
    }

    render() {
        const {
            email,
            password,
            rePassword,
            firstName,
            lastName,
            phoneNumber,
            errors,
        } = this.state;

        return (
            <PageLayout>
                <PageHeader title='Register Page'/>
                <Form className={styles.form} onSubmit={this.submitForm}>
                    <div className={styles['error-container']}>
                            {errors.length !== 0
                            ? <ErrorMessage error={errors[errors.length - 1]}/>
                            : '' }
                    </div>
                    <Input label='Email'
                           placeholder='Your email...'
                           id='email'
                           onChange = {(e) => this.onChange(e, 'email')}
                           type='email'
                           value={email}
                           onBlur={() => this.handleEmailBlur('Email is invalid!')}
                           />

                    <Input label='Password'
                           placeholder='Your password...'
                           id='password'
                           onChange = {(e) => this.onChange(e, 'password')}
                           type='password'
                           value={password}
                           onBlur={() => this.handlePasswordBlur('Password should be between 3 and 20 symbols.')}
                           />

                    <Input label='Repeat Password'
                           placeholder='Password again...'
                           id='rePassword'
                           onChange = {(e) => this.onChange(e, 'rePassword')}
                           type='password'
                           value={rePassword}
                           onBlur={() => this.handleRePasswordBlur('Repassword should match the password.')}
                           />
                           
                    <Input label='First Name'
                           placeholder='Your first name...'
                           id='firstName'
                           onChange = {(e) => this.onChange(e, 'firstName')}
                           type='text'
                           value={firstName}
                           onBlur={() => this.handleNameBlur('firstName', 'First Name should be between 3 and 20 symbols.')}
                           />

                    <Input label='Last Name'
                           placeholder='Your last name...'
                           id='lastName'
                           onChange = {(e) => this.onChange(e, 'lastName')}
                           type='text'
                           value={lastName}
                           onBlur={() => this.handleNameBlur('lastName', 'Last Name should be between 3 and 20 symbols.')}
                           />

                    <Input label='Phone Number (Optional)'
                           placeholder='Your phone number...'
                           id='phoneNumber'
                           onChange = {(e) => this.onChange(e, 'phoneNumber')}
                           type='text'
                           value={phoneNumber}
                           onBlur={() => this.handlePhoneNumberBlur('Phone number is invalid.')}
                           />

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