// A GENERIC TO GENERATE A UNION OF OBJECTS OF ACTIONS
export type ActionObjectGenerator<Type extends object> = {
    [key in keyof Type]: Type[key] extends never ? { type: string } : { type: string, payload: Type[key] }
}

// A GENERIC TO FILTER A KEY-VALUE PAIR FORM AN OBJECT
export type ObjectFilterer<UniversalType extends object, SpecifiedKey extends keyof UniversalType> = {
    [key in keyof UniversalType as key extends SpecifiedKey ? key : never]: UniversalType[key]
}

// A GENERIC TO FILTER OUT A KEY-VALUE PAIR FROM AN OBJECT
export type ObjectEmitter<UniversalType extends object, SpecifiedKey extends keyof UniversalType> = {
    [key in keyof UniversalType as key extends SpecifiedKey ? never : key]: UniversalType[key]
}

// A GENERIC TO GET THE RETURN TYPE OF A FUNCTION
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetReturnType<Type extends (...args: any) => any> = Type extends (...args: any) => infer ReturnType ? ReturnType : unknown