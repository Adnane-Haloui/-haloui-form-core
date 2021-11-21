import {formInstance, store, storedField, storeElement} from "../../types";
import React from "react";

export class FormStore implements formInstance{
    // fields
    private forceRootUpdate = () => {} ;

    private store: store= {}

    constructor() {
        //super(props);
    }
    // set
    setForceRootUpdate( forceRootUpdate : () => void):void{
        this.forceRootUpdate = forceRootUpdate
    }
    // methods
    checkInstance(): boolean {
        return false;
    }

    submit(): storedField[] {
        //return this.store
        let toSend : storedField[] = []
        Object.keys(this.store).map(e  => {
            toSend.push(this.store[e].field)
        })
        return toSend

    }

    forceUpdate(): void {
        this.forceRootUpdate()
    }

    dispatch(field: storedField): void {
        this.store[field.uuid].field = { ...this.store[field.uuid].field , ...field}
        this.store[field.uuid].Wrapper.on(field)
    }

    emit(storeElement: storeElement): void {
        this.store[storeElement.field.uuid] = storeElement
    }


}

export const useFormAction = (formStore :typeof FormStore) =>  (ref?:React.MutableRefObject<formInstance| undefined>  ) : [formInstance] => {
   // instance ref
   const formRef = ref ? ref : React.useRef<formInstance>();

   const [, forceUpdate] = React.useState({});
    if (!formRef.current) {
            // Create a new FormStore if not provided
            const forceReRender = () => {
                forceUpdate({});
            };
            const __form = new formStore()
            __form.setForceRootUpdate(forceReRender)
            formRef.current = __form;
    }
    return [formRef.current];
}

