import React, { Component } from 'react';
import PageLayout from '../../components/page-layout';
import PageHeader from '../../components/page-header';
import FirstAdForm from '../../components/ad-form/first-ad-form';
import SecondAdForm from '../../components/ad-form/second-ad-form';
import SubmitPannel from '../../components/ad-form/submit-pannel';
import globalConstants from '../../global-constants';

class CreateAd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            firstFormData: {
                title: '',
                make: '',
                model: '',
                fuelType: '',
                transmission: '',
                manufactureMonth: '',
                manufactureMonths: globalConstants.months,
                manufactureYear: 2020,
                photos: [],
                fuelTypes: globalConstants.fuelTypes,
                transmissions: globalConstants.transmissions,
            },
            secondFormData: {
                price: 'Negotiable',
                distanceRun: 0,
                horsepower: 0,
                color: '',
                description: '',
                type: '',
                types: globalConstants.types,
            },
            error: '',
        }
    }

    nextStep = () => {
        const { step } = this.state;

        this.setState({
            step: step + 1,
        })
    }

    previousStep = () => {
        const { step } = this.state;

        this.setState({
            step: step - 1,
        })
    }

    onChange = (event, type) => {
        const form = this.state.step === 1 ? 'firstFormData' : 'secondFormData';
        this.setState({ [form]: { ...this.state[form], [type]: event.target.value} });
    }

    onFileChange = (event, type) => {
        const files = [...event.target.files];
        
        this.setState({ firstFormData: { ...this.state.firstFormData, [type]: files} });
    }

    showError = (error) => {
        this.setState({error: error});
    }

    renderStep = () => {
        const { step } = this.state;
        
        if (step === 1) {
            return <FirstAdForm 
                nextStep={this.nextStep}
                values={this.state.firstFormData}
                onChange={this.onChange}
                onFileChange={this.onFileChange}
            />;
        } else if (step === 2) {
            return <SecondAdForm 
                nextStep={this.nextStep}
                previousStep={this.previousStep}
                values={this.state.secondFormData}
                onChange={this.onChange}
            />;
        } else if (step === 3) {
            return <SubmitPannel
                values={{
                    ...this.state.firstFormData,
                    ...this.state.secondFormData,
                }}
                previousStep={this.previousStep}
                showError={this.showError}
            />;
        }
    }

    render() {
        const { error } = this.state;
        return (
            <PageLayout>
                <PageHeader title='Create New Ad'/>
                <div>{error}</div>
                { this.renderStep() }
               
            </PageLayout>
            )
        }
}

export default CreateAd;