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

const CRUDButtonView = styled.TouchableOpacity `
text-align: center;
width: 70px;
border-radius:2px;  
justifyContent: center;
align-items: center;
height: 50px;  
fontColor: white; 
`;
 
//types
interface CRUDButtonProps{
    btnStyles?: StyleProp<ViewStyle>; 
    onPress: ((event: GestureResponderEvent) => void) | undefined; 
    textStyles?: StyleProp<TextStyle>; 
    children: ReactNode; 
}



const CRUDButton : FunctionComponent<CRUDButtonProps> = (props) => {
    return( 
        <ButtonWrapper>
        <CRUDButtonView onPress={props.onPress} style={props.btnStyles}>
            <BoldText textStyles={props.textStyles}>{props.children}</BoldText>
        </CRUDButtonView>
        </ButtonWrapper>
    )
}; 

export default CRUDButton; 