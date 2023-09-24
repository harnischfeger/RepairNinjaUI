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

const BasicButtonView = styled.TouchableOpacity `
text-align: center;
width: 300px;
padding: 20px; 
border-radius:20px;  
justifyContent: center;
align-items: center;
height: 60px; 
margin-top: 30px; 
fontColor: white; 
`;
 
//types
interface BasicButtonProps{
    btnStyles?: StyleProp<ViewStyle>; 
    onPress: ((event: GestureResponderEvent) => void) | undefined; 
    textStyles?: StyleProp<TextStyle>; 
    children: ReactNode; 
}



const BasicButton : FunctionComponent<BasicButtonProps> = (props) => {
    return( 
        <ButtonWrapper>
        <BasicButtonView onPress={props.onPress} style={props.btnStyles}>
            <BoldText textStyles={props.textStyles}>{props.children}</BoldText>
        </BasicButtonView>
        </ButtonWrapper>
    )
}; 

export default BasicButton; 