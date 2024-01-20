// IMPORTING NECESSARY FILES
    // IMPORTING MODULES
import React from "react"
import {v4 as uuid} from "uuid"
    // IMPORTING HOOKS
import TodoContextHook from "./hooks/TodoContextHook"
    // IMPORTING GUARDS
import {arrayHasTodos} from "./types/Guards"
    // IMPORTING ENUMS
import {TODO_CONTEXT_REDUCER_ACTION_TYPE} from "./types/Enums"
    // IMPORTING COMPONENTS
import InputBar from "./components/InputBar"
    // IMPORTING TYPES
import {AppFormData} from "./types/Types"

// DECLARING A FUNCTION THAT RETURNS AN APP COMPONENT
export default function App() {
    // DEFINING STATE
        // A STATE TO KEEP TRACK OF THE APPLICATIONS ERRORS
    const [error, setError] = React.useState<string>('')
        // A STATE TO KEEP TRACK OF WHETHER THE APPLICATION IS LOADING
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
        // A STATE TO KEEP TRACK OF THE FORMDATA
    const [formData, setFormData] = React.useState<AppFormData>({ text: '' })

    // OBTAINING THE TODOCONTEXT'S STATE AND DISPATCH FROM ITS HOOK
    const {todoList, error: todoContextError, dispatch} = TodoContextHook()

    // A FUNCTION TO FETCH THE TODOS DATA
    const fetchTodosData: () => void = React.useCallback(() => {
        setIsLoading(true)
        setError('')

        try{
            const storedTodos: string | null = localStorage.getItem("todoList")

            if(storedTodos){
                const parsedTodos: unknown =  JSON.parse(storedTodos)

                if(!arrayHasTodos(parsedTodos)){
                    throw new Error("The data obtained is not of the required TodoType format")
                }

                dispatch({
                    type: TODO_CONTEXT_REDUCER_ACTION_TYPE.CREATE_TODO,
                    payload: parsedTodos
                })

                setError('')
            }
        }catch(error: unknown){
            setError(`${(error as Error).name}: ${(error as Error).message}`)
        }finally{
            setIsLoading(false)
        }
    }, [dispatch])

    // A FUNCTION TO HANDLE THE FORMDATA
    function handleFormData(e: React.ChangeEvent<HTMLInputElement>): void{
        const {name, value} = e.target
        setFormData(prevFormData => ({...prevFormData, [name]: value}))
    }

    // A FUNCTION TO ADD TO THE TODOS DATA
    function addTodosData(): void{
        setIsLoading(true)
        setError('')

        try{
            if(!formData.text){
                throw new Error("You must write something in order to add a note")
            }

            dispatch({
                type: TODO_CONTEXT_REDUCER_ACTION_TYPE.ADD_TODO,
                
                payload: {
                    text: formData.text.trim(),
                    id: uuid(),
                    filter: "incomplete"
                }
            })

            setError('')
        }catch(error: unknown){
            setError(`${(error as Error).name}: ${(error as Error).message}`)
        }finally{
            setIsLoading(false)
        }
    }

    // DEFINING USEEFECTS
        // A USEEFFECT TO FETCH THE REQUIRED DATA
    React.useEffect(fetchTodosData, [fetchTodosData])
    
        // A USEEFFECT TO SET THE ERROR TO THE CONTEXTERROR WHENEVER FOUND
    React.useEffect(() => {
        if(todoContextError){
            setError(todoContextError)
        }
    }, [todoContextError])

    return (
        // THE CONTAINER FOR THE WHOLE APPLICATION
        <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-gray-100 rounded">
            <h2 className="mt-3 mb-6 text-2xl font-bold text-center uppercase">Personal To Do App</h2>
            
            <InputBar
                formData={formData}
                loading={isLoading}
                handleFormData={handleFormData}
                addTodosData={addTodosData}
            />

            {/* CONITIONALLY RENDERING THE ERROR OR THE LIST OF TODOS */}
            {error && <h2 className="font-bold text-center text-2xl uppercase">{error}</h2>}
        </div>
    )
}
