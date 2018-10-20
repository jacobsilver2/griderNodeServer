// surveyNew shows surveyNew and surveyForm

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview'

class SurveyNew extends Component {
    state = { showFormReview: false }

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview onCancel={ () => this.setState({showFormReview: false}) }/>
        }
        return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})}/>
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

// the whole reason for putting reduxForm on this component is so when we hit
// any link, the values will be deleted.
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);