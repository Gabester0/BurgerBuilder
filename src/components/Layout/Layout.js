import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Auxilliary from '../../containers/hoc/Auxilliary';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) =>(
    <Auxilliary>
        <Toolbar style={props.height} />
            <SideDrawer/>
            <main className={classes.Content}>
                {props.children}
            </main>

    </Auxilliary>
); 

export default layout;