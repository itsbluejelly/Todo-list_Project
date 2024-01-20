// IMPORTING NECESSARY FILES
    // IMPORTING MODULES
import {configureStore} from "@reduxjs/toolkit"
    // IMPORTING REDUCERS
import TodoContextReducer from "./TodoContextReducer"

// CREATING A STORE FOR ALL THE CONTEXTS
const Store = configureStore({
    reducer: {
        TodoContext: TodoContextReducer
    }
})

export default Store