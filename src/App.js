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
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            money: this.props.money,
            flowers: this.props.flowers,
            flowersInTheShop: this.props.flowersInTheShop,
            isFlowersDisabled: null
        };
        this.checkAmountOfMoney.bind(this);

    }


    handleChange = (event, value) => {
        this.setState({value});
    };

    componentDidUpdate(prevState) {
        if (this.prevState.flowersInTheShop !== undefined && this.prevState.flowersInTheShop !== this.state.flowersInTheShop) {
            if (this.state.flowersInTheShop == 0) {
                return 0
            }
        }
    }

    checkAmountOfMoney = () => {
        let aa = this.state.money === 0 ? this.setState({isFlowersDisabled: true}) : this.state.isFlowersDisabled

    };

    handleAddFlower = () => {
        let newAmountOfMoney = this.state.money - 1;
        let newNumberOfFlowersAvailable = this.state.flowersInTheShop - 1;
        this.setState({money: newAmountOfMoney, flowersInTheShop: newNumberOfFlowersAvailable});
        this.checkAmountOfMoney();
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
                            justifyContent: 'space-between'
                        }}>
                            <Paper disabled={this.state.isFlowersDisabled} style={{
                                margin: 10,
                                background: '#5799DE',
                                width: 150,
                                height: 50,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} elevation={1}>
                                <div>Money you have:</div>
                                <div>${this.state.money}</div>
                            </Paper>
                            <Paper style={{
                                margin: 10,
                                background: '#5799DE',
                                width: 150,
                                height: 50,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} elevation={1}>
                                <div>Flowers available:</div>
                                <div>{this.state.flowersInTheShop}</div>
                            </Paper>
                            <MenuList
                                style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'column'}}>
                                List of Flowers available
                                {this.state.flowers.map((item) => {
                                    return <MenuItem
                                        onClick={this.handleAddFlower}
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
        flowers: state.flowers,
        flowersInTheShop: state.flowersInTheShop
    });
};

export default connect(
    mapStateToProps,
)(Game);