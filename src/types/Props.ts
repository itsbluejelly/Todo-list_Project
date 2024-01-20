// IMPORTING NECESARY FILES
    // IMPORTING MODULES
import {Dispatch, ReactNode} from "react"
    // IMPORTING TYPES
import {AppFormData, TodoType} from "./Types"
    // IMPORTING GENERICS
import {ObjectEmitter, ObjectFilterer} from "./Generics"
import { UnknownAction } from "@reduxjs/toolkit/react"

// DEFINING PROPS FOR THE INPUTBAR COMPONENT
export type InputBarProps = {
    formName: keyof ObjectEmitter<AppFormData, "filter">,
    formValue: ObjectEmitter<AppFormData, "filter">[keyof ObjectEmitter<AppFormData, "filter">]
    handleFormData: (e: React.ChangeEvent<HTMLInputElement>) => void,
    loading: boolean,
    handleClick: (searchTerm?: string) => void,
    placeholder?: string,
    children: ReactNode
}

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
    handleClick: Dispatch<UnknownAction>
}