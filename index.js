const redux = require('redux')



const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'


//action creator functions
function orderCake (qty = 1) {
    return {
        type: CAKE_ORDERED,
        payload: qty
    }
}

function restockCake (qty = 10) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

//defining initial state
const initialState = {
    numOfCakes: 10
}

//reducer function
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - action.payload
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state
    }
}

//creating a store
const createStore = redux.legacy_createStore
const store = createStore(reducer)
console.log('Initial State ', store.getState())

//subscribe to the store for state updation
//return a function which is used to unsubscribe in future
const unsubscribe = store.subscribe(() => {
    return console.log('Update State ', store.getState())
})

//creating bindActionCreators

// store.dispatch(orderCake(2))
// store.dispatch(orderCake(2))
// store.dispatch(orderCake(2))
// store.dispatch(restockCake())

const bindActionCreators = redux.bindActionCreators
const actions = bindActionCreators({orderCake, restockCake}, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(5)

unsubscribe()