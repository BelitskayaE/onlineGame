import * as data from '../config.json'
import {
    ADD_TO_CART
} from '../actions/types';

const initialState = {
    money: data.money,
    flowersInGarden: data.flowersInTheGarden,
    flowers: data.flowers,
    flowersInTheShop:data.flowersInTheShop,
    cartState:data.cartState
};

const gameReducer = (state = initialState, action) => {
    try {
        switch (action.type) {
            case ADD_TO_CART: {
                return {
                    ...initialState,
                    cartState: {
                        ...action.data,
                    },

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