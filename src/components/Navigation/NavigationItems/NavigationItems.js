import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.css';

const navigationItems = () =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem href="/" active>Burger Builder</NavigationItem>
        <NavigationItem href="/">Checkout</NavigationItem>
    </ul>
);

export default navigationItems;