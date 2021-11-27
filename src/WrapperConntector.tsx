import React, {useEffect, useMemo, useRef, useState} from "react";
import  {storedField, Wrapper, WrapperInstance} from "./types";


/*
const WrapperConntector : React.ForwardRefRenderFunction<Wrapper , WrapperInstance> =  (props, ref)  => {

    const wrapperRef = React.useRef<Wrapper>();
    //const fieldRef = React.useRef()

    useImperativeHandle(wrapperRef , () => props.wrapper)


    const render = () => {
        console.log('hello again')
        console.log('get',props.wrapper.get())
        if(React.isValidElement(props.children))
            return React.cloneElement(props.children , { ...props.wrapper.get()})
        throw new Error('wrapper Error')
    }

    return (
        render()
    )
}

export default React.forwardRef(WrapperConntector)
*/


const WrapperConntector : React.FC<WrapperInstance> =  (props)  => {

    const [fieldProps , setFieldProps] = useState<storedField>(React.isValidElement(props.children) ? props.children.props : {})
    // field ref
    const fieldRef = useRef()

    const Wrapper  : Wrapper= useMemo<Wrapper>(() => ({
        on : (field) => {
            setFieldProps(field)
        },
        ref : () => {
            return fieldRef.current
        }
    }), [])

    useEffect(() => {
            props.form.emit({field : fieldProps , Wrapper})
    }, [])
    //const fieldRef = React.useRef()

    const render = () => {
        if(React.isValidElement(props.children))
            return React.cloneElement(props.children, {...fieldProps  , ref : fieldRef}   )
        throw new Error('wrapper Error')
    }

    return (
        render()
    )
}

export default WrapperConntector
