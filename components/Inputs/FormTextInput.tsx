import React, {FunctionComponent} from "react";
import {colors} from "../colors"; 
import styled from "styled-components/native";


const InputBox = styled.TextInput`
background-color: ${colors.white};
opacity: 0.8;
border-width: 2px; 
border-radius: 5px; 
padding: 5px; 
margin-bottom: 5px; 
padding-left: 10px; 
`;
 
//types
interface FormInput{
    name: string; 
    password: boolean; 
  }


const FormTextInput : FunctionComponent<FormInput & any> =  ({
    name, 
    password, 
    ...props}) => {
    return( 
        <InputBox 
        secureTextEntry = {password ? true: false}
        {...props}
         >
        </InputBox>  
    )
}; 

export default FormTextInput; 