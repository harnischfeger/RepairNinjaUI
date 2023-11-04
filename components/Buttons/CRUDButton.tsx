import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { ReactNode } from "react";

import { colors } from "../colors";
import BoldText from "../Texts/BoldText";
import { TouchableOpacity, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";

const ButtonWrapper = styled.View`
width: 100%; 
justifyContent: center;
align-items: center;
`;

//types
type CRUDButtonProps={
    children: ReactNode; 
    btnStyles?: StyleProp<ViewStyle>; 
    onPress: () => any; 
    textStyles?: StyleProp<TextStyle>; 
}



const CRUDButton = ({children, onPress, btnStyles}:CRUDButtonProps) => {
    return( 
        <ButtonWrapper>
        <TouchableOpacity onPress ={onPress} style={[styles.button, btnStyles]}>
            <BoldText textStyles={[styles.text]}>{children}</BoldText>
        </TouchableOpacity>
        </ButtonWrapper>
    )
}; 

export default CRUDButton; 

const styles = StyleSheet.create({
    button: {
        width: 70,
        borderRadius:2,  
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    text:{
        fontFamily: "SimSun",
        color: colors.white
    }
})