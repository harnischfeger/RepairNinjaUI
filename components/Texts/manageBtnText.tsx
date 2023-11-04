import { Text } from "react-native";
import { colors } from "../colors";


import { TextProps } from "./types"; 

const manageBtnText = ({children} : TextProps) => {
    return <Text style={[{
        color: colors.black,
        fontSize: 24, 
        textAlign: "left",
        fontFamily: "SimSun"
}]}>{children}</Text>; 
}; 

export default manageBtnText; 