// DECLARING A FUNCTION THAT RETURNS A FILTERBAR COMPONENT
export default function FilterBar(){
    return(
        // A CONTAINER FOR THE FILTERBAR COMPONENT
        <div className="flex space-x-4 items-center">
            <select name="" id="">
                <option value="none">All</option>
                <option value="completed">Completed</option>
                <option value="incompleted">Incompleted</option>
            </select>
        </div>
    )
}