import {
    ADD_TO_CART
} from './types';

export const setNewCartState = (data) => ({
    type: ADD_TO_CART,
    data
});
