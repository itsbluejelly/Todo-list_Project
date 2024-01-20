// IMPORTING NECESARY FILES
    // IMPORTING MODULES
import {ReactNode} from "react"
    // IMPORTING TYPES
import {AppFormData} from "./Types"
    // IMPORTING GENERICS
import {Prettier} from "./Generics"

// DEFINING PROPS FOR THE TODOCONTEXT PROVIDER
export type TodoContextProviderProps = { children: ReactNode }

// DEFINING PROPS FOR THE INPUTBAR COMPONENT
export type InputBarProps = Prettier<TodoContextProviderProps & {
    formName: keyof AppFormData,
    formValue: AppFormData[keyof AppFormData]
    handleFormData: (e: React.ChangeEvent<HTMLInputElement>) => void,
    loading: boolean,
    handleClick: (searchTerm?: string) => void
    placeholder?: string
}>