import {
    ADD_TO_CART,
    BUY_FLOWER,
    MONEY_LEFT,
    GROWING_fLOWER
} from './types';

export const setNewCartState = (data) => ({
    type: ADD_TO_CART,
    data
});

export const setNewFlowersStateInTheShop = (data) => ({
    type: BUY_FLOWER,
    data
});
export const setNewAccountState = (data) => ({
    type: MONEY_LEFT,
    data
});
export const plantFlower = () => ({
    type: GROWING_fLOWER
});