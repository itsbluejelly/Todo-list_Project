// IMPORTING NECESSARY TYPES
import {TodoType} from "./Types"

// A GUARD TO TEST IF AN ARRAY REALLY HAS TODOS
export function arrayHasTodos(array: unknown): array is TodoType[]{
    if(Array.isArray(array) && array.length){
        return array.every(item => (
            typeof item === "object" && item !== null &&
            "text" in item && typeof item.text === "string" &&
            "id" in item && (typeof item.id === "string" || typeof item.id === "number") &&
            "filter" in item && (item.filter === "complete" || item.filter === "incomplete")
        ))
    }

    return false
}