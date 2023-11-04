import { Text } from "react-native";
import { colors } from "../colors";


import { TextProps } from "./types"; 

const BoldText = ({children, textStyles} : TextProps) => {
    return <Text style={[{
        color: colors.black,
        fontSize: 15, 
        fontWeight: "bold",
        fontFamily: "SimSun"
}, textStyles]}>{children}</Text>; 
}; 

export default BoldText; 