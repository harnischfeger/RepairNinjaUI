import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { ReactNode } from "react";

import { colors } from "../colors";
import BoldText from "../Texts/BoldText";
import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from "react-native";

const ButtonWrapper = styled.View`
width: 100%; 
justifyContent: center;
align-items: center;
`;

const ButtonViewSubmit = styled.TouchableOpacity `
background-color: ${colors.submitBtn}; 
text-align: center;
width: 300px;
padding: 20px; 
border-radius:20px;  
justifyContent: center;
align-items: center;
height: 60px; 
margin-top: 30px; 
`;
 
//types
interface SubmitButtonProps{
    btnStyles?: StyleProp<ViewStyle>; 
    onPress: ((event: GestureResponderEvent) => void) | undefined; 
    textStyles?: StyleProp<TextStyle>; 
    children: ReactNode; 
}



const SubmitButton : FunctionComponent<SubmitButtonProps> = (props) => {
    return( 
        <ButtonWrapper>
        <ButtonViewSubmit onPress={props.onPress} style={props.btnStyles}>
            <BoldText textStyles={props.textStyles}>{props.children}</BoldText>
        </ButtonViewSubmit>
        </ButtonWrapper>
    )
}; 

export default SubmitButton; 