import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";

export type TextProps = {
    children: ReactNode;
    textStyles?: StyleProp<TextStyle>;    
}