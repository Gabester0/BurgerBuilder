import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(ctrl=>(
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={()=> props.ingrdientAdded(ctrl.type)}/>
        ))}
    </div>
);

export default buildControls;