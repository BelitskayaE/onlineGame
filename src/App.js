import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {connect} from "react-redux";
import MenuList from "@material-ui/core/es/MenuList/MenuList";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Chip from "@material-ui/core/es/Chip/Chip";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Badge from "@material-ui/core/es/Badge/Badge";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {
    setNewAccountState,
    setNewCartState,
    setNewFlowersStateInTheShop
} from "./actions/game-actions";
import Garden from "./Garden";

function TabContainer({children}) {
    return (
        <div>
            {children}
        </div>
    );
}


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }


    handleChange = (event, value) => {
        this.setState({value});
    };


    dispatchToStore = (newAmountOfMoney, newNumberOfFlowersAvailable, fillCart) => {
        this.props.setNewAccountState(newAmountOfMoney);
        this.props.setNewCartState(fillCart);
        this.props.setNewFlowersStateInTheShop(newNumberOfFlowersAvailable)
    };

    handleAddFlower = () => {
        let newAmountOfMoney = this.props.money !== 0 ? (this.props.flowersInTheShop !== 0 ? this.props.money - 1 : this.props.money) : 0;
        let newNumberOfFlowersAvailable = this.props.money !== 0 ? (this.props.flowersInTheShop !== 0 ? this.props.flowersInTheShop - 1 : 0) : this.props.flowersInTheShop;
        let fillCart = this.props.money !== 0 && this.props.flowersInTheShop !== 0 ? this.props.cartState + 1 : this.props.cartState;
        this.dispatchToStore(newAmountOfMoney, newNumberOfFlowersAvailable, fillCart)
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };


    renderWarning=()=>{
        let warning = this.props.money === 0 ? <div style={{color:'red'}}>No money left on your account</div>:
            (this.props.flowersInTheShop === 0 ? <div style={{color:'red'}}>Sorry, no flowers left in our shop</div>:<div/>);
        return warning
    };


    render() {
        return (
            <div style={{background:'#666562'}} className='App'>
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
                        <Chip
                            avatar={<Avatar>{this.props.money + 'Kč'}</Avatar>}
                            label="Your account"
                            variant="outlined"
                            style={{
                                margin: 10,
                                position:'absolute'
                            }}>
                        </Chip>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                        }}>
                        <h1 style={{color: '#616161'}}>This is Shop<IconButton aria-label="Cart">
                            <Badge badgeContent={this.props.cartState} color="secondary">
                                <ShoppingCartIcon/>
                            </Badge>
                        </IconButton></h1>
                            <h4>Here you can buy some flowers for your garden</h4>
                        <Chip
                            avatar={<Avatar>{this.props.flowersInTheShop}</Avatar>}
                            label="Flowers available"
                            variant="outlined"
                            style={{
                                background: '#5799DE',
                            }}>
                        </Chip>
                        <MenuList
                            style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'column'}}>
                            {this.props.flowers.map((item) => {
                                return <MenuItem
                                    onClick={this.handleAddFlower}
                                    key={item.id}>{item.name}</MenuItem>
                            })}
                        </MenuList>
                        {this.renderWarning()}
                        </div>
                    </TabContainer>
                    <TabContainer><Garden/></TabContainer>
                </SwipeableViews>
            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return ({
        money: state.money,
        flowers: state.flowers,
        flowersInTheShop: state.flowersInTheShop,
        cartState: state.cartState
    });
};

const mapDispatchToProps = dispatch => ({
    setNewCartState: (value) => dispatch(setNewCartState(value)),
    setNewFlowersStateInTheShop: (value) => dispatch(setNewFlowersStateInTheShop(value)),
    setNewAccountState: (value) => dispatch(setNewAccountState(value)),

});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);