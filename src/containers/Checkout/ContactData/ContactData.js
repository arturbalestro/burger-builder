import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import ErrorHandler from '../../../hoc/ErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'name',
                    placeholder: 'Your Name'
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    name: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validationRules: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'street',
                    placeholder: 'Your Street, 700'
                },
                value: '',
                validationRules: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'zipCode',
                    placeholder: 'Your Postal Code'
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 5,
                    maxLength: 9
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'country',
                    placeholder: 'Your Country'
                },
                value: '',
                validationRules: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'REG', displayName: 'Regular'},
                        {value: 'EXP', displayName: 'Express'},
                        {value: 'TUR', displayName: 'Turbo'}
                    ]
                },
                value: 'REG',
                validationRules: {},
                valid: true
            }
        },
        formIsValid: false
    }

    handleOrder = (event) => {
        event.preventDefault();
        
        let formData = {};
        for(let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order);
    }

    validateData(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    handleInputChange = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedElem = {
            ...updatedForm[inputIdentifier]
        }
        updatedElem.value = event.target.value;
        updatedElem.valid = this.validateData(updatedElem.value, updatedElem.validationRules);
        updatedElem.touched = true;

        let formIsValid = true;
        for(let inputs in updatedForm) {
            formIsValid = updatedForm[inputs].valid && formIsValid;
        }

        updatedForm[inputIdentifier] = updatedElem;
        this.setState({ orderForm: updatedForm, formIsValid });
    }

    render() {
        const formElements = [];
        for(let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.handleOrder}>
                {formElements.map((elem) => (
                    <Input 
                        key={elem.id}
                        elementType={elem.config.elementType} 
                        elementConfig={elem.config.elementConfig} 
                        value={elem.config.value} 
                        touched={elem.config.touched}
                        invalid={!elem.config.valid}
                        shouldValidate={elem.config.validationRules}
                        changed={(event) => this.handleInputChange(event, elem.id)}
                    /> 
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>
                    ORDER
                </Button>
            </form>
        );

        if(this.props.loading) {
            form = <Spinner/>;
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ContactData, axios));