import React from 'react';
import {connect} from "react-redux";
import MenuList from "@material-ui/core/es/MenuList/MenuList";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Chip from "@material-ui/core/es/Chip/Chip";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Badge from "@material-ui/core/es/Badge/Badge";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {AddFlower} from './addFlower';
import {
    setNewAccountState,
    setNewCartState,
    setNewFlowersStateInTheShop
} from "../actions/game-actions";


class Shop extends React.Component {
    constructor(props) {
        super(props);

    }


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


    renderWarning = () => {
        let warning = this.props.money === 0 ? 'No money left on your account' :
            (this.props.flowersInTheShop === 0 ? 'Sorry, no flowers left in our shop':'');
        return warning
    };


    renderChipAccount = () => {
        return <Chip
            avatar={<Avatar>{this.props.money + 'Kč'}</Avatar>}
            label="Your account"
            variant="outlined"
            style={{
                margin: 10,
                position: 'absolute'
            }}>
        </Chip>
    };

    renderCart = () => {
        return <h1 style={{color: '#616161'}}>This is Shop<IconButton aria-label="Cart">
            <Badge badgeContent={this.props.cartState} color="secondary">
                <ShoppingCartIcon/>
            </Badge>
        </IconButton></h1>
    };

    renderFlowers = () => {
        return <div className='flowers'><Chip
            avatar={<Avatar>{this.props.flowersInTheShop}</Avatar>}
            label="Flowers available"
            variant="outlined"
            style={{
                background: '#5799DE',
            }}>
        </Chip>
            <MenuList className='flowers-menu-list'>
                {this.props.flowersTypes.map((item) => {
                    return <MenuItem
                        onClick={this.handleAddFlower}
                        key={item.id}>{item.name}<AddFlower style={{width: '20', height: '20'}}/>
                    </MenuItem>
                })}
            </MenuList></div>
    };


    render() {
        return (
            <div className='App'>
                <div className='chip-account'>{this.renderChipAccount()}</div>
                <div className='content'>
                    <div className='cart'>{this.renderCart()}</div>
                    <h4>Here you can buy some flowers for your garden</h4>
                    {this.renderFlowers()}
                    <div className='warning'>{this.renderWarning()}</div>
                </div>
            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return ({
        money: state.money,
        flowersTypes: state.flowersTypes,
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
)(Shop);