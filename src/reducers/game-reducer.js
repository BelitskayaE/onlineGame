import * as data from '../config.json'
import {
    ADD_TO_CART, BUY_FLOWER, GROWING_fLOWER,
    MONEY_LEFT
} from '../actions/types';

const initialState = {
    money: data.money,
    flowersInGarden: data.flowersInTheGarden,
    flowers: data.flowers,
    flowersInTheShop: data.flowersInTheShop,
    cartState: data.cartState,
    growingFlowers: []

};

const gameReducer = (state = initialState, action) => {
    try {

        switch (action.type) {
            case ADD_TO_CART: {
                return {
                    ...state,
                    cartState:
                    action.data,

                };
            }
            case BUY_FLOWER: {
                return {
                    ...state,
                    flowersInTheShop: action.data,

                };
            }

            case MONEY_LEFT: {
                return {
                    ...state,
                    money: action.data,

                };
            }
            case GROWING_fLOWER: {
                const fl = [...state.growingFlowers];
                fl.push({name: 'flower'});
                return {
                    ...state,
                    growingFlowers: fl

                };
            }
            default:
                return state;
        }
    } catch (e) {
        return console.warn(e);
    }
};

export default gameReducer;