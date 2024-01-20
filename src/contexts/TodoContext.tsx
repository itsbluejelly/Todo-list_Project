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

            const savedList: TodoType[] = [...state.todoList, {id, filter, text}]
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))
                
            return {...state, todoList: savedList, error: ''}
        }case TODO_CONTEXT_REDUCER_ACTION_TYPE.CREATE_TODO: {
            const savedList: TodoType[] = action.payload
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))

            return {...state, todoList: savedList}
        }case TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_ALL_COMPLETE: {
            const savedList: TodoType[] = state.todoList.map(todo => ({...todo, filter: "complete"}))
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))
            
            return {...state, todoList: savedList, error: ''}
        }case TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_ALL_INCOMPLETE: {
            const savedList: TodoType[] = state.todoList.map(todo => ({...todo, filter: "complete"}))
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))

            return {...state, todoList: savedList, error: ''}
        }case TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_COMPLETE: {
            const {id} = action.payload
            const foundTodo: TodoType | undefined = state.todoList.find(todo => todo.id === id)
            const initialTodoList: TodoType[] = state.todoList.filter(todo => todo.id !== id)

            if(!foundTodo){
                return {...state, error: `The Todo item of id ${id} does not exist`}
            }

            const savedList: TodoType[] = [...initialTodoList, {...foundTodo, filter: "complete"}]
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))
            
            return {...state, todoList: savedList, error: ''}
        }case TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_INCOMPLETE: {
            const {id} = action.payload
            const foundTodo: TodoType | undefined = state.todoList.find(todo => todo.id === id)
            const initialTodoList: TodoType[] = state.todoList.filter(todo => todo.id !== id)

            if(!foundTodo){
                return {...state, error: `The Todo item of id ${id} does not exist`}
            }

            const savedList: TodoType[] = [...initialTodoList, {...foundTodo, filter: "incomplete"}]
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))
            
            return { ...state, todoList: savedList, error: ''}
        }case TODO_CONTEXT_REDUCER_ACTION_TYPE.REMOVE_TODO: {
            const {id} = action.payload
            const foundTodo: TodoType | undefined = state.todoList.find(todo => todo.id === id)
            const initialTodoList: TodoType[] = state.todoList.filter(todo => todo.id !== id)

            if(!foundTodo){
                return {...state, error: `The Todo item of id ${id} does not exist`}
            }

            const savedList: TodoType[] = [...initialTodoList]
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))
            
            return {...state, todoList: savedList, error: ''}
        }case TODO_CONTEXT_REDUCER_ACTION_TYPE.TOGGLE_TODO: {
            const {id} = action.payload
            const foundTodo: TodoType | undefined = state.todoList.find(todo => todo.id === id)
            const initialTodoList: TodoType[] = state.todoList.filter(todo => todo.id !== id)

            if(!foundTodo){
                return {...state, error: `The Todo item of id ${id} does not exist`}
            }

            const savedList: TodoType[] = [...initialTodoList, {...foundTodo, filter: foundTodo.filter === "complete" ? "incomplete" : "complete"}]
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))
            
            return {...state, todoList: savedList, error: ''}
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