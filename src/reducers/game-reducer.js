import * as data from '../config.json'
import {
    ADD_TO_CART, BUY_FLOWER, GROWING_fLOWER, KILL_FLOWER,
    MONEY_LEFT,REMOVE_FROM_CART
} from '../actions/types';


const initialState = {
    money: data.money,
    flowersTypes: data.flowersTypes,
    flowersInTheShop: data.flowersInTheShop,
    cartState: [],
    growingFlowers: [],

};

const gameReducer = (state = initialState, action) => {
    try {

        switch (action.type) {
            case ADD_TO_CART: {
                const fl = state.cartState.slice();
                fl.push(action.data);
                return {
                    ...state,
                    cartState:fl,

                };
            }
            case REMOVE_FROM_CART: {
                const fl = state.cartState.slice();
                fl.pop();
                return {
                    ...state,
                    cartState:fl,

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
                const fl = state.growingFlowers.slice();
                fl.push(action.data);
                return {
                    ...state,
                    growingFlowers: fl

                };
            }
            case KILL_FLOWER: {
                const fl = [...state.growingFlowers];
                fl.splice(action.idx, 1);
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