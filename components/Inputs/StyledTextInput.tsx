import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import {MaterialCommunityIcons} from "@expo/vector-icons"; 

import { colors } from "../colors";
import SmallText from "../Texts/smallText";
import {InputProps} from "./types"; 


const InputWrapper = styled.View`
width: 100%; 
justifyContent: center;
align-items: center;
`;

const InputField = styled.TextInput`
width: 300px;
background-color: ${colors.white};
height: 60px; 
border-width: 2px; 
border-radius: 10px; 
border-color: ${colors.managePropBtn};
margin-vertical: 3px;
margin-bottom: 10px; 
padding: 15px; 
font-size: 13px; 
color: ${colors.black};
text-align: center;
`;



const StyledTextInput: FunctionComponent<InputProps> = ({
    label, 
    ...props
}) => {
    return (
    <InputWrapper>
      <SmallText>{label}</SmallText>
        <InputField {...props} placeholderTextColor={colors.black} style={props.style}/>
    </InputWrapper>

    );
}; 

export default StyledTextInput; 