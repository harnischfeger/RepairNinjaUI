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
type SubmitButtonProps = {
    children: ReactNode; 
    style?: StyleProp<ViewStyle>; 
    onPress: () => any; 
    textStyles?: StyleProp<TextStyle>;  
}



const SubmitButton = ({children, onPress}: SubmitButtonProps ) => {
    return( 
        <ButtonWrapper>
         <TouchableOpacity onPress ={onPress} style={styles.button}>
            <BoldText textStyles={[styles.text]}>{children}</BoldText>
        </TouchableOpacity>
        </ButtonWrapper>
    )
}; 

export default SubmitButton; 

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
        backgroundColor: colors.submitBtn
    },
    text:{
        fontFamily: "SimSun"
    }
})