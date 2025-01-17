import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Here's the burger you requested. We hope it tastes well.</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.cancelCheckout}>CANCEL ORDER</Button>
            <Button btnType="Success" clicked={props.continueCheckout}>CONTINUE</Button>
        </div>
    );
}

export default CheckoutSummary;