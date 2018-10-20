// contains logic to render a single label and text input
// because this is being rendered by the redux form "field" tag, 
// we have tons of props available.  Do a console log to check em out. 
// lots of event handlers.

import React from 'react';
// destructuring props.input, which is another object unto itself
// the ... in the input tag gives us all the props on the input tag without having to 
// type them all out.

// with the meta thing, that's crazy ES6 sytax to look into the 
// meta object and pull out those variables
const SurveyField = ({ input, label, meta: {error, touched} }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px'}}/>
            <div className="red-text">
                {touched && error}
            </div>
        </div>
    );
}

export default SurveyField;