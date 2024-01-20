// IMPORTING NECESSARY PROPS
import {FilterBarProps} from "../types/Props"

// DECLARING A FUNCTION THAT RETURNS A FILTERBAR COMPONENT
export default function FilterBar({formData, handleformData, loading, changeAllTodoData}: FilterBarProps){
    return(
        // A CONTAINER FOR THE FILTERBAR COMPONENT
        <div className="flex space-x-4 items-center mb-4">
            <select 
                name="filter"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleformData(e)}
                className="text-sm px-2 py-1 rounded border border-gray-500 focus:outline-none"
                value={formData.filter}
            >
                <option value="none">All</option>
                <option value="complete">Completed</option>
                <option value="incomplete">Incompleted</option>
            </select>

            <button 
                disabled={loading}
                onClick={() => changeAllTodoData("complete")}
                className="text-sm px-2 py-1 bg-purple-500 text-white rounded h-[48px]"
            >Mark All Completed</button>
        </div>
    )
}