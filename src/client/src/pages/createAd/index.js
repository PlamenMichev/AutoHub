import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import PageHeader from '../../components/page-header';
import FirstAdForm from '../../components/first-ad-form';
import SecondAdForm from '../../components/second-ad-form';

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
                {/* {<FirstAdForm />} */}
                <SecondAdForm />
               
            </PageLayout>
            )
        }
}

export default CreateAd;