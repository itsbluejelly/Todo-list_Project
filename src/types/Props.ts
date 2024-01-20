// IMPORTING NECESARY FILES
    // IMPORTING MODULES
import {ReactNode} from "react"
    // IMPORTING TYPES
import {AppFormData} from "./Types"

// DEFINING PROPS FOR THE TODOCONTEXT PROVIDER
export type TodoContextProviderProps = { children: ReactNode }

// DEFINING PROPS FOR THE INPUTBAR COMPONENT
export type InputBarProps = {
    formData: AppFormData,
    handleFormData: (e: React.ChangeEvent<HTMLInputElement>) => void,
    loading: boolean,
    addTodosData: () => void
}