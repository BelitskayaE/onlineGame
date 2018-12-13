import React from 'react';
import PropTypes from 'prop-types';
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

function TabContainer({children}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems:'center',
            width:'50%',
            padding:10
        }}>
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
            cartNum:0
        };


    }


    handleChange = (event, value) => {
        this.setState({value});
    };

    // componentDidUpdate(prevState) {
    //     if (this.prevState.flowersInTheShop !== undefined && this.prevState.flowersInTheShop !== this.state.flowersInTheShop) {
    //         if (this.state.flowersInTheShop == 0) {
    //             return 0
    //         }
    //     }
    // }


    handleAddFlower = () => {
        let newAmountOfMoney = this.state.money !== 0 ? (this.state.flowersInTheShop !==0 ?this.state.money - 1: this.state.money) : 0 ;
        let newNumberOfFlowersAvailable = this.state.money !== 0 ?  (this.state.flowersInTheShop !==0 ? this.state.flowersInTheShop - 1: 0): this.state.flowersInTheShop;
        this.setState({money: newAmountOfMoney, flowersInTheShop: newNumberOfFlowersAvailable,cartNum:((this.props.flowersInTheShop - this.state.flowersInTheShop)+1) });
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    renderWarning=()=>{
        let warning = this.state.money == 0 ? <div style={{color:'red'}}>No money left on your account</div>:
            (this.state.flowersInTheShop == 0 ? <div style={{color:'red'}}>Sorry, no flowers left in our shop</div>:<div/>);
        return warning
    };

    handleCart=()=>{

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
                    <TabContainer >
                        <h1 style={{color:'#616161'}}>This is Shop<IconButton aria-label="Cart">
                            <Badge badgeContent={this.state.cartNum} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton></h1>
                            <Chip
                                avatar={<Avatar>{this.state.money + 'Kč'}</Avatar>}
                                label="Your account"
                                variant="outlined"
                                style={{
                                    margin:10
                            }} >
                            </Chip>
                            <Chip
                                avatar={<Avatar>{this.state.flowersInTheShop}</Avatar>}
                                label="Flowers available"
                                variant="outlined"
                                style={{
                                background: '#5799DE',
                                    margin:10
                            }} >
                            </Chip>
                                <MenuList
                                    style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'column'}}>
                                    {this.state.flowers.map((item) => {
                                        return <MenuItem
                                            onClick={this.handleAddFlower}
                                            key={item.id}>{item.name}</MenuItem>
                                    })}
                                </MenuList>
                        {this.renderWarning()}
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