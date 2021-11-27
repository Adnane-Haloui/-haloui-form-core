import React from "react";
import {FormStore} from "../actions";
// generic Types
export type arrayValue = (string | number)[];
export type value = string | Date | number | arrayValue | undefined
export type eventCallBack = <T extends {uuid: string , value: value }| string | undefined>(event : T) => void
export type middleware = (field : field ) => field

// validation
export type validation = string | ((value : value) => boolean)


export type FormStoreType = typeof FormStore

export interface Wrapper {
    on:(field: storedField) => void,
    ref:() => any
    //get : () => storedField;
}
export type WrapperInstance = {
    form : formInstance,
    children?:React.ReactNode
}
export type  storeElement = {
    field : field,
    Wrapper : Wrapper
}
export type store = Record<string, storeElement>



// fields
export interface storedField {
    type:string, // to join the uui component
    uuid:string,
    defaultValue?:value,
    value?:value,
    helpIndicator?:boolean,
    visibility?:boolean,
    // error
    errorHandling?:boolean,
    ShowInstantError?:boolean,
}
export interface field extends storedField{
    colorTheme?: string,
    // error
    errorHandling?:boolean,
    ShowInstantError?:boolean,
    dispatch?:(field : storedField) => void,
    // validation
    validation?:validation
}

export interface fieldInstance {
    onChangeValue?:eventCallBack
}
// field Core
export interface fieldWithRef<T extends fieldInstance,U extends field>  extends React.ForwardRefRenderFunction<T,U>{}

// form Types
export type formConfig = {
    // UUI
    defaultColorTheme?:string,
    // error
    errorHandling?:boolean,
    ShowInstantError?:boolean,
    scrollToFirstError?:boolean
}
export interface formInstance {
    submit : (formattedField?:() => any) => storedField[],
    checkInstance : () => boolean,
    forceUpdate : () => void,
    emit: (field : storeElement) => void,
    dispatch:(field : storedField | storedField[]) => void,
    scrollTo:(field : storedField) => void,
    setMiddlewares:(middlewares : middleware[]) => void
    //on : (uuid : string, callback : (field : storedField) => void) => void,
}
export interface formRequired {
    form:formInstance,
    fields?: field[],
    children?: React.ReactNode,
    config?: formConfig,
    // event props
    onChangeValue? : eventCallBack,
    // did mount
    didFormMount?: () => void
}


