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
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";


class Shop extends React.Component {
    constructor(props) {
        super(props);

    }


    dispatchToStore = (newAmountOfMoney, newNumberOfFlowersAvailable) => {
        this.props.setNewAccountState(newAmountOfMoney);
        this.props.setNewFlowersStateInTheShop(newNumberOfFlowersAvailable)
    };

    handleAddFlower = (identifyer) => {
        let newAmountOfMoney = this.props.money !== 0 ? (this.props.flowersInTheShop !== 0 ? this.props.money - 1 : this.props.money) : 0;
        let newNumberOfFlowersAvailable = this.props.money !== 0 ? (this.props.flowersInTheShop !== 0 ? this.props.flowersInTheShop - 1 : 0) : this.props.flowersInTheShop;
        if (this.props.money !== 0 && this.props.flowersInTheShop !== 0) {
            this.props.cartState.push(identifyer);
        }
        this.dispatchToStore(newAmountOfMoney, newNumberOfFlowersAvailable);
        this.props.setNewCartState(this.props.cartState);
    };


    renderWarning = () => {
        let warning = this.props.money === 0 ? 'No money left on your account' :
            (this.props.flowersInTheShop === 0 ? 'Sorry, no flowers left in our shop' : '');
        return warning
    };


    renderChipAccount = () => {
        return <Chip
            avatar={<Avatar>{this.props.money + 'Kč'}</Avatar>}
            label="Your account"
            variant="outlined"
            className='chip'
            style={{position: 'absolute'}}
        >
        </Chip>
    };

    cartContent=(item)=>{
        return item.map((item,idx)=>{
            return <p key={idx}>{item.name}</p>
        })
    };


    renderCart = () => {
        return <h1 style={{color: '#616161'}}>This is Shop<IconButton aria-label="Cart">
            <Tooltip title={this.cartContent(this.props.cartState)}>
                <Badge badgeContent={this.props.cartState.length} color="secondary">
                    <ShoppingCartIcon/>
                </Badge>
            </Tooltip>
        </IconButton></h1>
    };

    renderFlowers = () => {
        return <div className='flowers'><Chip
            avatar={<Avatar>{this.props.flowersInTheShop}</Avatar>}
            label="Flowers available"
            variant="outlined"
            className='chip'
            style={{
                background: '#5799DE',
            }}>
        </Chip>
            <MenuList>
                {this.props.flowersTypes.map((item, idx) => {
                    return <MenuItem className='flowers-menu-list'
                                     onClick={() => this.handleAddFlower({name: item.name})}
                                     key={idx}>{item.name}<AddFlower style={{width: '20', height: '20'}}/>
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