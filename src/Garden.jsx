import React from 'react';
import {connect} from "react-redux";
import {
    growingFlower,
    plantFlower,
    setNewAccountState,
    setNewCartState,
    setNewFlowersStateInTheShop
} from "./actions/game-actions";
import Paper from "@material-ui/core/es/Paper/Paper";
import Chip from "@material-ui/core/es/Chip/Chip";
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import Button from "@material-ui/core/es/Button/Button";


class Garden extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    handlePlantFlower = () => {
        let recountCart = this.props.cartState !== 0 ? this.props.cartState - 1 &&  this.props.plantFlower() : this.props.cartState;
        this.props.setNewCartState(recountCart);

    };

    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
            }} className='Garden'>
                <p>Here you can plant and grow your flowers.</p>
                <div style={{display: 'flex', flexDirection: 'row'}}><Chip
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

                <Paper style={{margin: 20, padding: 20, background: 'rgb(97, 132, 60)'}} elevation={1}>
                    <div>{this.props.growingFlowers.map((item,idx) => {
                        return <div key={idx}>{item.name}</div>
                    })}</div>
                </Paper>
            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return ({
        money: state.money,
        flowers: state.flowers,
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

});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Garden);