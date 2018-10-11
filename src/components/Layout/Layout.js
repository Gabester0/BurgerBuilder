import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Auxilliary from '../../containers/hoc/Auxilliary';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true
    };

    closedSideDrawerHandler = () =>{
        this.setState({showSideDrawer : false});
    }

    render (){
        return (
            <Auxilliary>
                <Toolbar />
                    <SideDrawer 
                        open={this.state.showSideDrawer} 
                        closed={this.closedSideDrawerHandler}/>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
            
            </Auxilliary>
        )
    }
};


export default Layout;