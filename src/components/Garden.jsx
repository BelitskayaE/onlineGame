import React from 'react';
import {connect} from "react-redux";
import {
    killFlower,
    plantFlower,
    setNewAccountState,
    setNewCartState,
    setNewFlowersStateInTheShop,
} from "../actions/game-actions";
import Paper from "@material-ui/core/es/Paper/Paper";
import Chip from "@material-ui/core/es/Chip/Chip";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import Flower from "./Flower";
import Button from "@material-ui/core/es/Button/Button";
import {cartContent} from "./Shop";
import Tooltip from "@material-ui/core/es/Tooltip/Tooltip";


class Garden extends React.Component {

    handlePlantFlower = () => {
        let flowerToPlant = this.props.cartState[this.props.cartState.length - 1];
        let recountCart = this.props.cartState.length !== 0 ? this.props.cartState.slice(0, this.props.cartState.length - 1) : this.props.cartState;
        this.props.setNewCartState(recountCart);
        let accessPlanting = this.props.cartState.length > 0 ? this.props.plantFlower(flowerToPlant) : 0;
        return accessPlanting
    };
    renderPlantedFlowers = () => {
        return this.props.growingFlowers.map((item, idx) => {
            let props = {
                name: item.name,
                killFlower: () => this.props.killFlower(idx)

            };
            return <div key={idx} style={{margin: 5, display: 'flex', alignItems: 'center'}}>
                <div>{item.name}</div>
                <Flower {...props}/>

            </div>
        })
    };

    renderFlowersCounter = () => {
        return <div className='flowers-counter'>
            <Tooltip title={cartContent(this.props.cartState)}>
                <Chip
                    avatar={<Avatar>{this.props.cartState.length}</Avatar>}
                    label="Flowers you have"
                    variant="outlined"
                    className='chip'
                    style={{
                        background: '#5799DE',
                        margin: 10
                    }}>
                </Chip>
            </Tooltip>
            <Button onClick={this.handlePlantFlower} variant="contained">
                Plant flower
            </Button></div>
    };

    renderGardenSquare = () => {
        return <Paper className='garden-square' style={{background: 'rgb(97, 132, 60)'}} elevation={1}>
            <div>{this.renderPlantedFlowers()}</div>
        </Paper>
    };

    render() {
        return (
            <div className='content'>
                <p>Here you can plant and grow your flowers.</p>
                {this.renderFlowersCounter()}
                <div
                    className='warning'>{this.props.cartState.length === 0 ? 'You have no flowers in the cart' : ''}</div>
                {this.renderGardenSquare()}
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return ({
        money: state.money,
        flowersTypes: state.flowersTypes,
        flowersInTheShop: state.flowersInTheShop,
        cartState: state.cartState,
        growingFlowers: state.growingFlowers,
    });
};

const mapDispatchToProps = dispatch => ({
    setNewCartState: (value) => dispatch(setNewCartState(value)),
    setNewFlowersStateInTheShop: (value) => dispatch(setNewFlowersStateInTheShop(value)),
    setNewAccountState: (value) => dispatch(setNewAccountState(value)),
    plantFlower: (value) => dispatch(plantFlower(value)),
    killFlower: (idx) => dispatch(killFlower(idx)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Garden);