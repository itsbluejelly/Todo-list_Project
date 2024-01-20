// A GENERIC TO GENERATE A UNION OF OBJECTS OF ACTIONS
export type ActionUnionObjectsGenerator<Type extends object> = {
    [key in keyof Type]: Type[key] extends never ? { type: key } : { type: key, payload: Type[key] }
}[keyof Type]

// A GENERIC TO FILTER A KEY-VALUE PAIR FORM AN OBJECT
export type ObjectFilterer<UniversalType extends object, SpecifiedKey extends keyof UniversalType> = {
    [key in keyof UniversalType as key extends SpecifiedKey ? key : never]: UniversalType[key]
}

// A GENERIC TO SHOW ALL KEY-VALUE PAIRS IN AN OBJECT
export type Prettier<Type extends object> = {
    [key in keyof Type]: Type[key]
}

// A GENERIC TO FILTER OUT A KEY-VALUE PAIR FROM AN OBJECT
export type ObjectEmitter<UniversalType extends object, SpecifiedKey extends keyof UniversalType> = {
    [key in keyof UniversalType as key extends SpecifiedKey ? never : key]: UniversalType[key]
}