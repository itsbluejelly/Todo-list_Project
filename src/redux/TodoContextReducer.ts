// IMPORTING NECESSARY FILES
    // IMPORTING MODULES
import {createSlice} from "@reduxjs/toolkit"
    // IMPORTING TYPES
import {TodoContextReducerStateType, TodoContextReducerActionType, TodoType} from "../types/Types"

// A VARIABLE CONTAINING THE INITIAL STATE FOR THE REDUCER
const initialState: TodoContextReducerStateType = { 
    todoList: [],
    error: '' 
}

// A VARIABLE THAT CONTAINS THE TODOCONTEXT SLICE
export const TodoContextSlice = createSlice({
    name: "TodoContextReducer",
    initialState,
    
    reducers: {
        addTodo: (state: TodoContextReducerStateType, action: TodoContextReducerActionType["ADD_TODO"]) => {
            const {id, filter, text} = action.payload
            const foundTodo: boolean = state.todoList.some(todo => todo.id === id)

            if(foundTodo){
                return {...state, error: `The Todo item of id ${id} already exists`}
            }

            const savedList: TodoType[] = [...state.todoList, {id, filter, text}]
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))
                
            return {...state, todoList: savedList, error: ''}
        },

        createTodo: (state: TodoContextReducerStateType, action: TodoContextReducerActionType["CREATE_TODO"]) => {
            const savedList: TodoType[] = action.payload
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))

            return {...state, todoList: savedList}
        },

        markAllComplete: (state: TodoContextReducerStateType) => {
            const savedList: TodoType[] = state.todoList.map(todo => ({...todo, filter: "complete"}))
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))
            
            return {...state, todoList: savedList, error: ''}
        },

        markAllIncomplete: (state: TodoContextReducerStateType) => {
            const savedList: TodoType[] = state.todoList.map(todo => ({...todo, filter: "incomplete"}))
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))

            return {...state, todoList: savedList, error: ''}
        },

        markComplete: (state: TodoContextReducerStateType, action: TodoContextReducerActionType["MARK_COMPLETE"]) => {
            const {id} = action.payload
            const foundTodo: TodoType | undefined = state.todoList.find(todo => todo.id === id)

            if(!foundTodo){
                return {...state, error: `The Todo item of id ${id} does not exist`}
            }

            const savedList: TodoType[] = state.todoList.map(todo => todo.id === id ? {...foundTodo, filter: "complete"} : todo)
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))
            
            return {...state, todoList: savedList, error: ''}
        },

        markIncomplete: (state: TodoContextReducerStateType, action: TodoContextReducerActionType["MARK_INCOMPLETE"]) => {
            const {id} = action.payload
            const foundTodo: TodoType | undefined = state.todoList.find(todo => todo.id === id)

            if(!foundTodo){
                return {...state, error: `The Todo item of id ${id} does not exist`}
            }

            const savedList: TodoType[] = state.todoList.map(todo => todo.id === id ? {...foundTodo, filter: "incomplete"} : todo)
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))
            
            return { ...state, todoList: savedList, error: ''}
        },

        removeTodo: (state: TodoContextReducerStateType, action: TodoContextReducerActionType["REMOVE_TODO"]) => {
            const {id} = action.payload
            const foundTodo: TodoType | undefined = state.todoList.find(todo => todo.id === id)
            const initialTodoList: TodoType[] = state.todoList.filter(todo => todo.id !== id)

            if(!foundTodo){
                return {...state, error: `The Todo item of id ${id} does not exist`}
            }

            const savedList: TodoType[] = initialTodoList
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))
            
            return {...state, todoList: savedList, error: ''}
        },

        toggleTodo: (state: TodoContextReducerStateType, action: TodoContextReducerActionType["TOGGLE_TODO"]) => {
            const {id} = action.payload
            const foundTodo: TodoType | undefined = state.todoList.find(todo => todo.id === id)

            if(!foundTodo){
                return {...state, error: `The Todo item of id ${id} does not exist`}
            }

            const savedList: TodoType[] = state.todoList.map(todo => todo.id === id ? {...foundTodo, filter: foundTodo.filter === "complete" ? "incomplete" : "complete"} : todo)
            localStorage.removeItem("todoList")
            localStorage.setItem("todoList", JSON.stringify(savedList))
            
            return {...state, todoList: savedList, error: ''}
        }
    }
})

// EXPORTING THE ACTION FUNCTIONS FROM THE TODOCONTEXT SLICE
export const {addTodo, createTodo, markAllComplete, markAllIncomplete, markComplete, markIncomplete, toggleTodo, removeTodo} = TodoContextSlice.actions
// EXPORTING THE PAYLOAD FROM THE TODOCONTEXTSLICE
export default TodoContextSlice.reducer