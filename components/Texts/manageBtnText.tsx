import React, {FunctionComponent} from "react";
import styled from "styled-components/native";

import { colors } from "../colors";

const StyledText = styled.Text `
font-size: 24px; 
color: ${colors.white}; 
text-align: left; 
font-family: SimSun; 
`;

import { TextProps } from "./types"; 
const manageBtnText: FunctionComponent<TextProps> = (props) => {
    return <StyledText style={props.textStyles}>{props.children}</StyledText>; 
}; 

export default manageBtnText; 