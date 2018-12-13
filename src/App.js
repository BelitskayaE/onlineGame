import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {connect} from "react-redux";
import Paper from "@material-ui/core/es/Paper/Paper";
import MenuList from "@material-ui/core/es/MenuList/MenuList";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";

function TabContainer({children}) {
    return (
        <div style={{background: '#fff', width: '50%', padding: 8 * 3}}>
            {children}
        </div>
    );
}


class Game extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        return (
            <div className='App'>
                <AppBar position="static" color="default">
                    <Tabs
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="Shop"/>
                        <Tab label="Garden"/>
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer>
                        <div>This is Shop</div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent:'space-between'
                        }}>
                            <Paper style={{
                                margin: 10,
                                background: '#5799DE',
                                width: 150,
                                height: 50,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} elevation={1}>
                                <div>Money you have:</div>
                                <div>${this.props.money}</div>
                            </Paper>
                            <MenuList style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'column'}}>
                                List of Flowers available
                                {this.props.flowers.map((item) => {
                                    return <MenuItem
                                        key={item.id}>{item.name}</MenuItem>
                                })}
                            </MenuList>
                        </div>
                    </TabContainer>
                    <TabContainer>Garden</TabContainer>
                </SwipeableViews>
            </div>

        );
    }
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

Game.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return ({
        money: state.money,
        flowers: state.flowers
    });
};

export default connect(
    mapStateToProps,
)(Game);