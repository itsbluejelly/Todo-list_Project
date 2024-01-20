// IMPORTING NECESSARY FILES
    // IMPORTING PROPS
import {TodoProps} from "../types/Props"
    // IMPORTING COMPONENTS
import {BsToggleOff, BsToggleOn, BsTrash, BsCheck} from "react-icons/bs"
import {FaTimes} from "react-icons/fa"
    // IMPORTING ACTIONS
import {toggleTodo, removeTodo, markComplete, markIncomplete} from "../redux/TodoContextReducer"

// DECLARING A FUNCTION THAT RETURNS A TODO COMPONENT
export default function Todo({todo, index, handleClick}: TodoProps){
    return (
        <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
            <div className="flex items-center">
                <span className="mr-4 text-gray-400">{index}</span>
                <span className={`mr-4 ${todo.filter === "complete" ? "line-through text-red-500": ""}`}>{todo.text}</span>
            </div>

            <div className="space-x-3 ml-8">
                <button
                    className="mr-2 text-sm bg-blue-500 text-white sm:px-2 py-1 px-1 rounded"
                    onClick={() => handleClick(toggleTodo({ id: todo.id }))}
                >{todo.filter === "complete" ? <BsToggleOff/> : <BsToggleOn/>}</button>

                <button
                    className="mr-2 text-sm bg-red-500 text-white sm:px-2 py-1 px-1 rounded"
                    onClick={() => handleClick(removeTodo({ id: todo.id }))}
                ><BsTrash/></button>

                <button
                    className={`mr-2 text-sm ${todo.filter === "incomplete" ? "bg-blue-500" : "bg-yellow-500"} text-white sm:px-2 py-1 px-1 rounded`}

                    onClick={() => 
                        todo.filter === "complete"
                            ?
                        handleClick(markIncomplete({ id: todo.id }))
                            :
                        handleClick(markComplete({ id: todo.id }))
                    }

                >{todo.filter === "incomplete" ? <BsCheck/> : <FaTimes/>}</button>
            </div>
        </li>
    )
}