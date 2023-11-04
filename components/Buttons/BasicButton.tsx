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
type BasicButtonProps = {
    children: ReactNode; 
    btnStyles?: StyleProp<ViewStyle>; 
    onPress: () => any; 
    textStyles?: StyleProp<TextStyle>; 
}



const BasicButton = ({children, onPress, btnStyles}: BasicButtonProps) => {
    return( 
        <ButtonWrapper>
        <TouchableOpacity onPress ={onPress} style={[styles.button, btnStyles]}>
            <BoldText textStyles={[styles.text]}>{children}</BoldText>
        </TouchableOpacity>
        </ButtonWrapper>
    )
}; 

export default BasicButton; 

const styles = StyleSheet.create({
    button: {
        textAlign: 'center',
        width: 300,
        padding: 20,
        borderRadius:20,  
        justifyContent: 'center',
        alignItems: 'center',
        height: 60, 
        marginTop: 30, 
       
    },
    text:{
        color: colors.white,
        fontFamily: "SimSun"
    }
})