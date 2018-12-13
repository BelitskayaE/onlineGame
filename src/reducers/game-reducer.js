import * as data from '../config.json'


const initialState = {
    money: data.money,
    flowersInGarden: data.flowersInTheGarden,
    flowers: data.flowers
};

function gameReducer(state = initialState) {
    return state;
}

export default gameReducer;