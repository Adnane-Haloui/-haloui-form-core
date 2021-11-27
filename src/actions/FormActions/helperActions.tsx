import React from "react";
import {formInstance} from "../../types";
import WrapperConntector from "../../WrapperConntector";


const hasChildren = (children : React.ReactNode | React.ReactNode[] , formStore : formInstance ) : React.ReactNode => {
        let newChildren : React.ReactNode[] = [];
        if(!Array.isArray(children))
            children = [children]

        if(Array.isArray(children))
            for(let child of children){
                if(React.isValidElement(child) && child.props.uuid && child.props.type) {
                        const Element =  React.createElement(WrapperConntector, { form : formStore
                            , children : React.cloneElement(child , { dispatch : formStore.dispatch.bind(formStore)}) })
                        newChildren.push(Element)
                    }else
                    newChildren.push(child)
            }
        return newChildren
}

export {
    hasChildren
}
