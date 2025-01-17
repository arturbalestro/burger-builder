import React from 'react';

import classes from './BuildControl.css';

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            onClick={props.removed} 
            className={classes.Less} 
            disabled={props.disabled}
        >-</button>
        <button 
            onClick={props.added} 
            className={classes.More}
        >+</button>
    </div>
);

export default BuildControl;