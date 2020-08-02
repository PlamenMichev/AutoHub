import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import PageHeader from '../../components/page-header';
import FirstAdForm from '../../components/ad-form/first-ad-form';
import SecondAdForm from '../../components/ad-form/second-ad-form';

class CreateAd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: 1,
        }
    }

    render() {
        const currentStep = this.props.location.pathname;
        return (
            <PageLayout>
                <PageHeader title='Create New Ad'/>

                {this.state.form === 1 ? <FirstAdForm /> : <SecondAdForm />}
               
            </PageLayout>
            )
        }
}

export default CreateAd;