// IMPORTING NECESSARY FILES
    // IMPORTING PROPS
import {InputBarProps} from "../types/Props"
    // IMPORTINH COMPONENTS
import { BsPlus } from "react-icons/bs"

// DECLARING A FUNCTION THAT RETURNS AN INPUTBAR COMPONENT
export default function InputBar({formData, handleFormData, loading, addTodosData}: InputBarProps){
    return (
        // THE CONTAINER FOR THE INPUTBAR COMPONENT
        <div className="flex items-center mb-4">
            <input 
                type="text" 
                name="text"
                placeholder="Enter Todo Note Here"
                value={formData.text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormData(e)}
                className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />

            <button 
                disabled={loading}
                onClick={addTodosData}
                className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            ><BsPlus/></button>
        </div>
    )
}