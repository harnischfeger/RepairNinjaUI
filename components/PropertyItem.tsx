import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { colors } from "./colors";
import SmallText from "./Texts/smallText";
import BoldText from "./Texts/BoldText";
import { TouchableOpacity } from "react-native";

const PropertyRow = styled.View`
background-color: ${colors.white};
opacity: 0.8;
padding-left: 15px;
padding-right: 15px; 
flex-direction: row; 
justify-content: space-between; 
align-items: center; 
width: 100%; 
height: 80px;
margin-bottom: 10px; 
`;

const LeftView = styled.View`
justify-content: flex-start; 
flex: 2; 
`; 
const RightView = styled.View`
flex:1; 

`; 

interface ListProps{
    id: string; 
    address: string; 
    city: string; 
    state: string; 
    zipcode: string; 
    intial_maint_cost: number; 

}

const PropertyItem: FunctionComponent<ListProps> = (props) => {
    return(
      
        <PropertyRow>
            <LeftView>
            <BoldText textStyles={{textAlign: "left", paddingBottom:5}}>
                Address:
            </BoldText>
            <SmallText textStyles={{textAlign: "left"}}          
            >
            {props.address}
            </SmallText>
            </LeftView>
            <RightView>
            <BoldText textStyles={{textAlign: "right", paddingBottom: 5}}>
                YTD Total:
            </BoldText>
            <SmallText textStyles={{textAlign: "right"}}                
            >       
            {props.intial_maint_cost}
            </SmallText>
     
            </RightView>
        </PropertyRow>
    );
};

export default PropertyItem;