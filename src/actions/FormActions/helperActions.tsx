import React from "react";
import {formInstance, storedField, Wrapper} from "../../types";
import WrapperConntector from "../../WrapperConntector";


const hasChildren = (children : React.ReactNode | React.ReactNode[] , formStore : formInstance) : React.ReactNode => {
        let newChildren : React.ReactNode[] = [];
        if(!Array.isArray(children))
            children = [children]

        if(Array.isArray(children))
            for(let child of children)
                if(React.isValidElement(child)) {
                    if(child.props.uuid && child.props.type){

                        const Element =  React.createElement(WrapperConntector, { form : formStore
                            , children : React.cloneElement(child , { dispatch : formStore.dispatch.bind(formStore)}) })

                        newChildren.push(Element)
                        //formStore.emit(child.props)*/
                    }else
                    newChildren.push(child)
                }
        console.log(newChildren)
        return newChildren
}

export {
    hasChildren
}
