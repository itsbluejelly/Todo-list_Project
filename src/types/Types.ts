// IMPORTING NECESSARY FILES
    // IMPORTING GENERICS
import {ActionUnionObjectsGenerator, ObjectFilterer, Prettier} from "./Generics"
    // IMPORTING ENUMS
import {TODO_CONTEXT_REDUCER_ACTION_TYPE} from "./Enums"

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
export type TodoContextReducerActionType = ActionUnionObjectsGenerator<{
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.ADD_TODO]: TodoType,
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_ALL_COMPLETE]: never,
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_ALL_INCOMPLETE]: never,
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_COMPLETE]: ObjectFilterer<TodoType, "id">,
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_INCOMPLETE]: ObjectFilterer<TodoType, "id">,
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.REMOVE_TODO]: ObjectFilterer<TodoType, "id">,
    [TODO_CONTEXT_REDUCER_ACTION_TYPE.TOGGLE_TODO]: ObjectFilterer<TodoType, "id">
}>

// A TYPE FOR THE TODO CONTEXT
export type TodoContextType = Prettier<TodoContextReducerStateType & { dispatch: React.Dispatch<TodoContextReducerActionType> }>