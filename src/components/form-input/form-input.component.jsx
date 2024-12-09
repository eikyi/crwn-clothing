import {FormInputLabel, Input,Group} from './form-input.styles';
const FormInput = ({label, ...otherPorps}) => {
    return(
        <Group>
        <Input {...otherPorps}></Input>
        { label && (
            <FormInputLabel shrink={otherPorps.value.length}> { label }</FormInputLabel>
        )  
        }
        
        </Group>
    )
    
}
export default FormInput;