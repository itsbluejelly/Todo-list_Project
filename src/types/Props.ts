// IMPORTING NECESARY FILES
    // IMPORTING MODULES
import {ReactNode} from "react"
    // IMPORTING TYPES
import {AppFormData, TodoType, TodoContextReducerActionType} from "./Types"
    // IMPORTING GENERICS
import {Prettier, ObjectEmitter, ObjectFilterer} from "./Generics"

// DEFINING PROPS FOR THE TODOCONTEXT PROVIDER
export type TodoContextProviderProps = { children: ReactNode }

// DEFINING PROPS FOR THE INPUTBAR COMPONENT
export type InputBarProps = Prettier<TodoContextProviderProps & {
    formName: keyof ObjectEmitter<AppFormData, "filter">,
    formValue: ObjectEmitter<AppFormData, "filter">[keyof ObjectEmitter<AppFormData, "filter">]
    handleFormData: (e: React.ChangeEvent<HTMLInputElement>) => void,
    loading: boolean,
    handleClick: (searchTerm?: string) => void,
    placeholder?: string
}>

// DEFINING PROPS FOR THE FILTERBAR COMPONENT
export type FilterBarProps = {
    formData: ObjectFilterer<AppFormData, "filter">,
    handleformData: (e: React.ChangeEvent<HTMLSelectElement>) => void
    loading: boolean,
    changeAllTodoData: (filter: "complete" | "incomplete") => void
}

// DEFINING PROPS FOR THE TODO COMPONENT
export type TodoProps = {
    todo: TodoType,
    index: number,
    handleClick: React.Dispatch<TodoContextReducerActionType>
}