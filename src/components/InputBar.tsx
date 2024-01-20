// IMPORTING NECESSARY FILES
    // IMPORTING PROPS
import {InputBarProps} from "../types/Props"

// DECLARING A FUNCTION THAT RETURNS AN INPUTBAR COMPONENT
export default function InputBar({handleFormData, loading, formName, handleClick, formValue, children, placeholder="Enter text here"}: InputBarProps){
    return (
        // THE CONTAINER FOR THE INPUTBAR COMPONENT
        <div className="flex items-center mb-4 mx-auto justify-center gap-[10px]">
            <input 
                type="text" 
                name={formName}
                placeholder={placeholder}
                value={formValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormData(e)}
                className="p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 lg:w-[150%]"
            />

            <button 
                disabled={loading}
                onClick={() => handleClick()}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
            >{children}</button>
        </div>
    )
}