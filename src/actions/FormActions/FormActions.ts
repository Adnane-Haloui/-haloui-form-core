import {field, formInstance, store, storedField, storeElement, validation, value , middleware} from "../../types";
import React from "react";

//(field , n_field) => if(field.type === 'radio') field.uuid === n_field.uuid
type reflexion = (field :field , o_field : field) =>  field | undefined
export class FormStore implements formInstance{
    // fields
    private forceRootUpdate = () => {} ;


    private middlewares :  middleware[] = []
    private store: store= {}
    //private reflexions : reflexion[] = []

    constructor() {
        //super(props);
        /*
        this.reflexions = [(field, o_field) => {
            if (field.type === 'radio' && o_field.uuid === '15'){
                o_field.value = '12DD'
                return o_field
            }
            return field
        }]*/
    }
    // set
    setForceRootUpdate( forceRootUpdate : () => void):void{
        this.forceRootUpdate = forceRootUpdate
    }
    setMiddlewares(middlewares: middleware[]): void {
        this.middlewares = middlewares;
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
    dispatch(field: field | field[]): void {
        if(!Array.isArray(field)){
            this._dispatch(field)
            return;
        }
        for(let _field of field){
            this._dispatch(_field)
        }
    }


    emit(storeElement: storeElement): void {
        this.store[storeElement.field.uuid] = storeElement
    }

    scrollTo(field : storedField):void{
        if(field.uuid && this.store[field.uuid] && this.store[field.uuid].Wrapper.ref())
            this.store[field.uuid].Wrapper.ref().scrollIntoView()
    }
    private _dispatch(field: field){

        //if((field.value && !field.validation) || (field.value && field.validation && this._validation(field.value , field.validation)))
        this.store[field.uuid].field = this._applyMiddleware({
            ...this.store[field.uuid].field ,
            ...field,
            errorHandling : field.validation ? this._validation(field.value, field.validation) : field.errorHandling
        })
        this.store[field.uuid].Wrapper.on(this.store[field.uuid].field)
        // Reflexions
        /*if(this.reflexions){
            this.reflexions.map(reflexion => {
               this.dispatch(this._applyReflexion(field, reflexion))
            })
        }*/
    }
    private _applyMiddleware(field:field): field{
        let _prev : field = field
        this.middlewares.map( middleFunc => {
                _prev = middleFunc(_prev)
        })
        return _prev
    }
    private _applyReflexion(field :field, reflexion : reflexion) : field[]{
        let _fields : field[] = []
        Object.keys(this.store).filter(key => key !== field.uuid ).map(key => {
            console.log(field , this.store[key].field)
            const reflexionResult = reflexion(field, this.store[key].field)
            if(reflexionResult)
                _fields.push(reflexionResult)
        })
        console.log(_fields)
        return _fields
    }
    private _validation(value :value , validation : validation) : boolean{
            if(typeof validation === 'string'){
                if(typeof value !== 'string')
                    throw new Error('validation dosen t match with value type')
                return !(new RegExp(validation).test(value as string))
            }
            return validation(value)

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

