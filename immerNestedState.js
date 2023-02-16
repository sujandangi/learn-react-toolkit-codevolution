//lets use immer (npm i immer) to directly change the property of state
//(under the hood it does not change directly)
//lets say a person wants to change his street address
const redux = require("redux")
const produce = require("immer").produce
const createStore = redux.legacy_createStore

const CHANGE_STREET = 'CHANGE_STREET'

//action creator
function changeStreet (newStreet) {
    return {
        type: CHANGE_STREET,
        payload: newStreet
    }
}

//initial state
const initialState = {
    name: "Rajesh",
    address: {
        street: "101, coding street",
        city: "Codeville",
        state: "Codenation"
    }
}

//reducer
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_STREET:
            //without using immer
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            //}

            //using immer library
            return produce(state, (draft) => {
                draft.address.street = action.payload
            })
            
        default:
            return state
    }
}

//creating store
const store = createStore(reducer)
console.log('Initial state ', store.getState())

const unsubscribe = store.subscribe(() => console.log("Updated state ", store.getState()))

//dispatching new street
store.dispatch(changeStreet("201, smart coder"))
store.dispatch(changeStreet("Immer street"))

unsubscribe()