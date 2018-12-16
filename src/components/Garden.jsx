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


class Garden extends React.Component {
    constructor(props) {
        super(props);

    }


    handlePlantFlower = () => {
        let recountCart = this.props.cartState !== 0 ? this.props.cartState - 1 : this.props.cartState;
        this.props.setNewCartState(recountCart);
        let accessPlanting = this.props.cartState > 0 ? this.props.plantFlower() : 0;
        return accessPlanting
    };
    renderPlantedFlowers = () => {
        return this.props.growingFlowers.map((item, idx) => {
            let props = {
                key: idx,
                killFlower: () => this.props.killFlower(idx)

            };
            return <div style={{margin: 5}}><Flower {...props}/>
            </div>
        })
    };

    renderFlowersCounter = () => {
        return <div className='flowers-counter'><Chip
            avatar={<Avatar>{this.props.cartState}</Avatar>}
            label="Flowers you have"
            variant="outlined"
            style={{
                background: '#5799DE',
                margin: 10
            }}>
        </Chip> <Button onClick={this.handlePlantFlower} variant="contained">
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
                <div className='warning'>{this.props.cartState === 0? 'You have no flowers in the cart':''}</div>
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
    plantFlower: () => dispatch(plantFlower()),
    killFlower: (idx) => dispatch(killFlower(idx)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Garden);