// IMPORTING NECESSARY FILES
    // IMPORTING GENERICS
import {ObjectFilterer, ActionObjectGenerator, GetReturnType} from "./Generics"
    // IMPORTING ENUMS
import {TODO_CONTEXT_REDUCER_ACTION_TYPE} from "./Enums"
    // IMPORTING STORE
import Store from "../redux/Store"

// A TYPE FOR THE TODO
export type TodoType = {
    text: string,
    id: string | number,
    filter: "complete" | "incomplete"
}

// A TYPE FOR THE TODOCONTEXTREDUCER STATE
export type TodoContextReducerStateType = { 
    todoList: TodoType[],
    error: string
}

// A TYPE FOR THE TODOCONTEXTREDUCER ACTION
export type TodoContextReducerActionType = ActionObjectGenerator<{
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.ADD_TODO]: TodoType,
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.CREATE_TODO]: TodoType[]
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_ALL_COMPLETE]: never,
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_ALL_INCOMPLETE]: never,
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_COMPLETE]: ObjectFilterer<TodoType, "id">,
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_INCOMPLETE]: ObjectFilterer<TodoType, "id">,
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.REMOVE_TODO]: ObjectFilterer<TodoType, "id">,
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.TOGGLE_TODO]: ObjectFilterer<TodoType, "id">
}>

// A TYPE FOR THE APPFORMDATA
export type AppFormData = { 
    text: string,
    search: string,
    filter: "none" | "complete" | "incomplete" 
}

// A TYPE FOR THE ROOTSTATE
export type RootState = GetReturnType<typeof Store.getState>
// A TYPE FOR THE STORE'S DISPATCH
export type StoreDispatch = typeof Store.dispatch