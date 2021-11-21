import React, {useEffect, useRef} from 'react'
import Form from './Form'
import * as ReactDOM from "react-dom";
import FieldExample from "./FieldExample";

import {useForm} from "./actions";

const App: React.FC = (props) => {
    //const ref = useRef<formInstance>(null)
    useEffect(()=> {console.log('app re rendring')})
    const [form] = useForm()

    return(
       <>
           {/*<p onClick={() => { if(ref && ref.current )console.log(ref.current.forceUpdate())}}>hello world</p>*/}
           {<p onClick={() => { console.log(form.submit())}}> hello world</p>}
           {<p onClick={() => { form.dispatch({type : 'mui' , uuid : '15' , helpIndicator : false})}}> hello world</p>}
        <Form form={form}  onChangeValue={(event) => {
            console.log(event)
        }}
        >
                <FieldExample type='mui-date' uuid='15'  helpIndicator={true}/>
                <FieldExample type='mui-date' uuid='20' />
                <FieldExample type='mui-date' uuid='254' />
        </Form>


       </>
    )
}


ReactDOM.render(  React.createElement(App) , document.querySelector('#root'))


//export default App
