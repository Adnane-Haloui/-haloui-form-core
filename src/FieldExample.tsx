import React, {useEffect, useImperativeHandle, useState} from 'react'
import {field, fieldInstance, fieldWithRef} from "./types";


const FieldExample : fieldWithRef<any, field> =  (field , ref) => {
//const FieldExample : React.FC< field> =  (field , ref) => {

    const onChangeValue = (value: string) => {
        console.log(field.type , field.uuid)
        //setValue(value)
        //console.log(value)
        if(field.dispatch)
            field.dispatch({...field,type : field.type , uuid : field.uuid , value})

    }
    //console.log(field.errorHandling)
    return(
        <>
            {
                field.helpIndicator && (<h1>node tn3ess</h1>)
            }
            <input ref={ref} type='text' onChange={(e) => onChangeValue(e.target.value)}
                   value={field.value as string} disabled={field.visibility}
            />
            {
                field.errorHandling && field.ShowInstantError && (
                    <h1>error</h1>
                )

            }
        </>
    )
}


//export default FieldExample
export default React.forwardRef(FieldExample)
