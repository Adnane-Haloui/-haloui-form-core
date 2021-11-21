import React from "react";
import {FormStore} from "../actions";
// generic Types
export type arrayValue = (string | number)[];
export type value = string | Date | number | arrayValue
export type eventCallBack = <T extends {uuid: string , value: value }| string | undefined>(event : T) => void

export type FormStoreType = typeof FormStore

export interface Wrapper {
    on:(field: storedField) => void,
    //get : () => storedField;
}
export type WrapperInstance = {
    form : formInstance,
    children?:React.ReactNode
}
export type  storeElement = {
    field : storedField,
    Wrapper : Wrapper
}
export type store = Record<string, storeElement>



// fields
export interface storedField {
    type:string, // to join the uui component
    uuid:string,
    defaultValue?:value,
    value?:value,
    helpIndicator?:boolean
}
export interface field extends storedField{
    colorTheme?: string,
    // error
    errorHandling?:true,
    ShowInstantError?:false,
    dispatch?:(field : storedField) => void,
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
    errorHandling?:true,
    ShowInstantError?:false,
    scrollToFirstError?:false
}
export interface formInstance {
    submit : () => storedField[],
    checkInstance : () => boolean,
    forceUpdate : () => void,
    emit: (field : storeElement) => void,
    dispatch:(field : storedField) => void,
    //on : (uuid : string, callback : (field : storedField) => void) => void,
}
export interface formRequired {
    form?:formInstance,
    fields?: field[],
    children?: React.ReactNode,
    config?: formConfig,
    // event props
    onChangeValue? : eventCallBack,
    // did mount
    didFormMount?: () => void
}
