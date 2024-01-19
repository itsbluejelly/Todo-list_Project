// IMPORTING NECESSARY FILES
    // IMPORTING TYPES
import {TodoContextType} from "../types/Types"
    // IMPORTING MODULES
import React from "react"
    // IMPORTING CONTEXTS
import {TodoContext} from "../contexts/TodoContext"

// DECLARING A FUNCTION HOOK THAT VALIDATES THE TODOCONTEXT
export default function TodoContextHook(): TodoContextType{
    const context = React.useContext(TodoContext)

    if(!context){
        throw new Error("The context you are looking for is not available via TodoContext, perhaps check the provider")
    }

    return context
}