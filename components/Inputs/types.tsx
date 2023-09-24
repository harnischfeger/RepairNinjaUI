import { ReactNode, ComponentProps} from "react";
import { TextInputProps } from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons"


interface ExtraInputProps {
    label: ReactNode;

}

export type InputProps = TextInputProps & ExtraInputProps; 
