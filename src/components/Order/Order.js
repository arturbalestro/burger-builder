import React from 'react';

import classes from './Order.css';

const Order = (props) => {

    const ingredients = [];
    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ing => {
        return <li style={{ textTransform: 'capitalize' }} key={ing.name}>
                {ing.name}: <strong>{ing.amount}</strong>
               </li>
    })

    return(
        <div className={classes.Order}>
            <p>Ingredients: </p>
            <ul>
                {ingredientOutput}
            </ul>

            <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;