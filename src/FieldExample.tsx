import React, {useEffect, useState} from 'react'
import {field, fieldInstance, fieldWithRef} from "./types";


const FieldExample : fieldWithRef<fieldInstance, field> =  (field , fieldInstance) => {

    const onChangeValue = (value: string) => {
        console.log(field.type , field.uuid)
        //setValue(value)
        //console.log(value)
        if(field.dispatch)
            field.dispatch({...field,type : field.type , uuid : field.uuid , value})

    }
    return(
        <>
            {
                field.helpIndicator && (<h1>node tn3ess</h1>)
            }
            <input type='text' onChange={(e) => onChangeValue(e.target.value)} value={field.value as string}/>

        </>
    )
}


export default FieldExample
