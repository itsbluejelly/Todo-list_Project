// IMPORTING NECESSARY FILES
    // IMPORTING MODULES
import React from "react";
    // IMPORTING TYPES
import {TodoContextType, TodoContextReducerStateType, TodoContextReducerActionType, TodoType} from "../types/Types"
    // IMPORTING ENUMS
import {TODO_CONTEXT_REDUCER_ACTION_TYPE} from "../types/Enums"
    // IMPORTING PROPS
import {TodoContextProviderProps} from "../types/Props"

// CREATING A TODO CONTEXT FOR THE APPLICATION
export const TodoContext = React.createContext<TodoContextType | null>(null)
// A VARIABLE CONTAINING THE INITIAL STATE FOR THE REDUCER
const initialState: TodoContextReducerStateType = { 
    todoList: [],
    error: '' 
}

// CREATING A REDUCER FOR THE TODO CONTEXT
export function TodoContextReducer(state: TodoContextReducerStateType, action: TodoContextReducerActionType): TodoContextReducerStateType{
    switch(action.type){
        case TODO_CONTEXT_REDUCER_ACTION_TYPE.ADD_TODO: {
            const {id, filter, text} = action.payload
            const foundTodo: boolean = state.todoList.some(todo => todo.id === id)

            if(foundTodo){
                return {...state, error: `The Todo item of id ${id} already exists`}
            }
                
            return {...state, todoList: [...state.todoList, {id, filter, text}], error: ''}
        }case TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_ALL_COMPLETE:
            return {...state, todoList: state.todoList.map(todo => ({...todo, filter: "complete"})), error: ''}
        case TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_ALL_INCOMPLETE:
            return {...state, todoList: state.todoList.map(todo => ({...todo, filter: "incomplete"})), error: ''}
        case TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_COMPLETE: {
            const {id} = action.payload
            const foundTodo: TodoType | undefined = state.todoList.find(todo => todo.id === id)
            const initialTodoList: TodoType[] = state.todoList.filter(todo => todo.id !== id)

            if(!foundTodo){
                return {...state, error: `The Todo item of id ${id} does not exist`}
            }
            
            return {...state, todoList: [...initialTodoList, {...foundTodo, filter: "complete"}], error: ''}
        }case TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_INCOMPLETE: {
            const {id} = action.payload
            const foundTodo: TodoType | undefined = state.todoList.find(todo => todo.id === id)
            const initialTodoList: TodoType[] = state.todoList.filter(todo => todo.id !== id)

            if(!foundTodo){
                return {...state, error: `The Todo item of id ${id} does not exist`}
            }
            
            return { ...state, todoList: [...initialTodoList, {...foundTodo, filter: "incomplete"}], error: ''}
        }case TODO_CONTEXT_REDUCER_ACTION_TYPE.REMOVE_TODO: {
            const {id} = action.payload
            const foundTodo: TodoType | undefined = state.todoList.find(todo => todo.id === id)
            const initialTodoList: TodoType[] = state.todoList.filter(todo => todo.id !== id)

            if(!foundTodo){
                return {...state, error: `The Todo item of id ${id} does not exist`}
            }
            
            return {...state, todoList: [...initialTodoList], error: ''}
        }case TODO_CONTEXT_REDUCER_ACTION_TYPE.TOGGLE_TODO: {
            const {id} = action.payload
            const foundTodo: TodoType | undefined = state.todoList.find(todo => todo.id === id)
            const initialTodoList: TodoType[] = state.todoList.filter(todo => todo.id !== id)

            if(!foundTodo){
                return {...state, error: `The Todo item of id ${id} does not exist`}
            }
            
            return {
                ...state, 
                todoList: [...initialTodoList, {...foundTodo, filter: foundTodo.filter === "complete" ? "incomplete" : "complete"}],
                error: ''
            }
        }
        default:
            return state
    }
}

// DECLARING A FUNCTION THAT RETURNS A TODOCONTEXT PROVIDER
export default function TodoContextProvider(props: TodoContextProviderProps){
    // OBTAINING STATE AND DISPATCH FROM USEREDUCER
    const [state, dispatch] = React.useReducer(TodoContextReducer, initialState)

    return(
        <TodoContext.Provider value={{...state, dispatch}}>
            {props.children}
        </TodoContext.Provider>
    )
}