import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Auxilliary from '../../containers/hoc/Auxilliary';
import classes from './Layout.css';

const layout = (props) =>(
    <Auxilliary>
        <Toolbar />
            <main className={classes.Content}>
                {props.children}
            </main>

    </Auxilliary>
); 

export default layout;