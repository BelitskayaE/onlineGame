import {
    ADD_TO_CART,
    BUY_FLOWER,
    MONEY_LEFT,
    GROWING_fLOWER,
    KILL_FLOWER
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
export const killFlower = (idx) => ({
    type: KILL_FLOWER,
    idx
});