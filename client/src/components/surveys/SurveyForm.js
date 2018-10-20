import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {

    renderFields() {
        return _.map(formFields, ({name, label}) => {
            return <Field 
                key={name}
                component={SurveyField}
                type="text"
                label={label}
                name={name}
            />
        })
    }

    // handleSubmit is provided by redux form
    render() {
        return (
            <div>
                <form onSubmit={ this.props.handleSubmit(this.props.onSurveySubmit) }>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    // the values object is the values coming from the form
    const errors = {}

    // on initial load it will run the test and produce an error because values.emails
    // will be undefined.  That's why there is the || '' 
    errors.recipients = validateEmails(values.recipients || '')

    // if there's no title, add the same property name to the errors object, provide an
    // error message
    _.each(formFields, ({ name, noValueError }) => {
        if (!values[name]) {
            errors[name] = noValueError
        }
    });


    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);