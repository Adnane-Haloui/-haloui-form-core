import React from "react";

import {_Form} from "./Form"
import {formInstance, formRequired} from "./types";

const Form = React.forwardRef<formInstance, formRequired>(_Form) as (
    props: formRequired & { ref?: React.Ref<formInstance> },
) => JSX.Element;

export {
    Form
}
export {useForm} from './actions'
export * from './types'
