import React from 'react';

import classes from './Input.css';

const Input = (props) => {
    let formElement = null;
    const inputClasses = [classes.FormElement];

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch(props.elementType) {
        case ('input'):
            formElement = (
                <input 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}
                />
            );
        break;
        
        case ('textarea'):
            formElement = (
                <textarea 
                    className={classes.FormElement} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}
                />
            );
        break;

        case ('select'):
            formElement = (
                <select 
                    className={classes.FormElement} 
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayName}</option>
                    ))}  
                </select>
            );
        break;

        default:
            formElement = <input className={classes.FormElement} 
                            {...props.elementConfig} value={props.value} />;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {formElement}
        </div>
    )
};

export default Input;