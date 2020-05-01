import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    handleCloseSideDrawer = () => {
        this.setState({ showSideDrawer: false });
    }

    handleToggleSideDrawer = () => {
        this.setState((prevState) => { 
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return(
            <Aux>
                <Toolbar clicked={this.handleToggleSideDrawer} />
                <SideDrawer opened={this.state.showSideDrawer} closed={this.handleCloseSideDrawer} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;