import React, {useEffect, useRef} from 'react'
import Form from './Form'
import * as ReactDOM from "react-dom";
import FieldExample from "./FieldExample";
import FieldExample2 from "./FieldExample2";

import {useForm} from "./actions";
// dynamic Instance
// Form Reflexion
// Field Validation
// Field Security

// validation  done
// bugs change visibility (types declaration ) && check uuid rep
// inject default value ( fields && form )


const App: React.FC = (props) => {
    //const ref = useRef<formInstance>(null)
    useEffect(()=> {console.log('app re rendring')})
    const [form] = useForm()
    /*form.setMiddlewares([(field) => {
        return {...field, type:'hopa'}
    } , ])*/

    const handle = () => {
        //form.dispatch([{uuid : '15' , type :'mui-date' , value:'hellooo'} , {uuid : '20' , value:'helloo world' , type:'mui-date'}])
        form.dispatch({uuid:'15' , type:'mui-date', visibility:true})
    }
    return(
       <>
           {/*<p onClick={() => { if(ref && ref.current )console.log(ref.current.forceUpdate())}}>hello world</p>*/}
           {<p onClick={() => { console.log(form.submit())}}> hello world</p>}
           {/*<p onClick={() => { form.dispatch({type : 'mui' , uuid : '15' , helpIndicator : false})}}> hello world</p>*/}
           <button onClick={handle}>click</button>
        <div>
            <Form form={form}  onChangeValue={(event) => {
                console.log(event)
            }}
                  // "^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
            >
                <FieldExample  type='mui-date' uuid='15'  helpIndicator={true} validation="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                   ShowInstantError={true}
                />
                <FieldExample  type='radio' uuid='125'  helpIndicator={true} validation="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                               ShowInstantError={true}
                />
            </Form>
        </div>



       </>
    )
}


ReactDOM.render(  React.createElement(App) , document.querySelector('#root'))


//export default App
