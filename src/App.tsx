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
import { BsPlus, BsSearch } from "react-icons/bs"
import FilterBar from "./components/FilterBar"
import Todo from "./components/Todo"
    // IMPORTING TYPES
import {AppFormData, TodoType} from "./types/Types"

// DECLARING A FUNCTION THAT RETURNS AN APP COMPONENT
export default function App() {
    // DEFINING STATE
        // A STATE TO KEEP TRACK OF THE APPLICATIONS ERRORS
    const [error, setError] = React.useState<string>('')
        // A STATE TO KEEP TRACK OF WHETHER THE APPLICATION IS LOADING
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
        // A STATE TO KEEP TRACK OF THE FORMDATA
    const [formData, setFormData] = React.useState<AppFormData>({ 
        text: '',
        search: '',
        filter: "none"
    })

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
    function handleFormData(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void{
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
            setFormData(prevFormData => ({...prevFormData, text: '', search: ''}))
            setIsLoading(false)
        }
    }

    // A FUNCTION TO SEARCH THROUGH THE LIST OF TODOS
    function searchTodoList(): void{
        setError('')

        try{
            const {search} = formData
            
            if(!search){
                throw new Error("You must write something in order to find a note")
            }
        }catch(error: unknown){
            setError(`${(error as Error).name}: ${(error as Error).message}`)
        }
    }

    // A FUNCTION TO CHANGE THE FILTER FIELD FOR ALL TODOS DATA
    function changeAllTodosData(filter: "complete" | "incomplete"): void{
        setIsLoading(true)
        
        filter === "complete"
            ?
        dispatch({ type: TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_ALL_COMPLETE })
            :
        dispatch({ type: TODO_CONTEXT_REDUCER_ACTION_TYPE.MARK_ALL_INCOMPLETE })

        setIsLoading(false)
    }

    // A FUNCTION TO GENERATE AN ARRAY OF TODOS
    function generateTodosArray(): JSX.Element[]{
        const filteredTodos: TodoType[] = todoList.filter(todo => 
            (todo.text.includes(formData.search.toLowerCase()) || todo.text.includes(formData.search.toLowerCase())) 
            && (formData.filter === "none" ? todo : todo.filter === formData.filter))

        return filteredTodos.map((todo, index) => <Todo
            todo={todo}
            index={index + 1}
            handleClick={dispatch}
        />)
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
            
            {/* THIS COMPONENT HANDLES ENTERING A NEW NOTE */}
            <InputBar
                loading={isLoading}
                handleFormData={handleFormData}
                formName="text"
                formValue={formData.text}
                placeholder="Enter your Todo note here"
                handleClick={addTodosData}
            ><BsPlus/></InputBar>

            {/*  A CONTAINER FOR THE FILTER AND SEARCH COMPONENTS */}
            <div className="flex items-center justify-between">
                {/* THIS COMPONENT HANDLES FILTERING THE TODOLIST */}
                <FilterBar
                    formData={{filter: formData.filter}}
                    handleformData={handleFormData}
                    loading={isLoading}
                    changeAllTodoData={changeAllTodosData}
                />

                {/* THIS COMPONENT HANDLES SEARCHING FOR A NOTE */}
                <InputBar
                    loading={isLoading}
                    handleFormData={handleFormData}
                    formName="search"
                    formValue={formData.search}
                    placeholder="Enter Text here to search"
                    handleClick={searchTodoList}
                ><BsSearch/></InputBar>
            </div>

            {/* A CONTAINER FOR THE TODOS */}
            <ul>
                {/* CONITIONALLY RENDERING THE ERROR OR THE LIST OF TODOS OR A LOADING MESAGE */}
                {
                    error || isLoading
                        ?
                    <li className="my-2 text-sm italic">{error ? error : "Loading..."}</li>
                        :
                    <>
                        <li className="my-2 text-sm italic">All yor notes here...</li>
                        {generateTodosArray()}
                    </>
                }
            </ul>
        </div>
    )
}
