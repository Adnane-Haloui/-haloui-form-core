import {formRequired, formInstance, value, field} from './types'
import React, {forwardRef, MutableRefObject, useEffect, useImperativeHandle, useMemo, useRef} from "react";
import { useForm , hasChildren} from "./actions";



const Form : React.ForwardRefRenderFunction<formInstance,formRequired> = (formRequired, formRef) => {

    const currentRef = useRef<formInstance>()

    const formMemo = useMemo<formInstance>(() => {
        if(formRequired.form)
            return formRequired.form
        return useForm(formRef as MutableRefObject<formInstance>)[0]
    } , [formRequired.form , formRef])


    // test re rendring
    useEffect(() => {console.log('hello form Re rendring' , formMemo)})


    useEffect(() => {
        console.log('hellooo ')
        /*formMemo.dispatch({uuid :'15' , value: 'helloo '
            , helpIndicator : true , type : 'mdj' , errorHandling:true, ShowInstantError:true})*/

        // destroy form Instance
    },[])

    useImperativeHandle(currentRef , () => formMemo)

    const handle = () => {
        //console.log(formRequired.form)
        if(formRequired.onChangeValue)
            formRequired.onChangeValue({uuid:'1',value:[1,2]})
    }

    const render = () : React.ReactNode => {
        if(formRequired.children)
            return hasChildren(formRequired.children,formMemo ) // defaultProps
        if(formRequired.fields)
            return (<div>hello</div>)
        throw new Error('no fields or children is defined')
    }
    return(
        <>
            {render()}
        </>
    )
}


export default forwardRef(Form)
