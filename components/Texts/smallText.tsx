import { Text } from "react-native";
import { colors } from "../colors";


import { TextProps } from "./types"; 

const SmallText = ({children, textStyles} : TextProps) => {
    return <Text style={[{
        color: colors.black,
        fontWeight: "normal",
        fontFamily: "SimSun"
}, textStyles]}>{children}</Text>; 
}; 

export default SmallText; 