import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { colors } from "./colors";
import SmallText from "./Texts/smallText";
import BoldText from "./Texts/BoldText";
import { TouchableOpacity } from "react-native";
import BasicButton from "./Buttons/BasicButton";
import CRUDButton from "./Buttons/CRUDButton";

const ContentContainer = styled.View`
width: 100%;
flex:1; 
`;

const TenantRow = styled.View`
background-color: ${colors.white};
opacity: 0.8;
padding-left: 15px;
padding-right: 15px; 
flex-direction: row;
flexWrap: wrap; 
justify-content: space-between; 
align-items: center; 
width: 100%; 
height: 150px;
margin-bottom: 10px; 
flex:1; 
`;

const TenantView = styled.View`
padding-left: 10px;
`; 


interface TenantProps{
    id: string; 
    address: string; 
    city: string; 
    firstname: string; 
    lastname: string; 
    phone: string;
    email: string; 

}

const TenantItem: FunctionComponent<TenantProps> = ({...props}) => {
    return(
   
        <TenantRow>
            <BoldText textStyles={{ textAlign: "center", 
            paddingBottom: 5, 
            paddingTop:10, 
            width: "100%"}}
                >
            {props.address}, {props.city}
            </BoldText>
             <TenantView>
            <BoldText textStyles={{paddingBottom: 5 }}>
                Name:  <SmallText>
                {props.firstname} {props.lastname}
            </SmallText>
            </BoldText>
        
            <BoldText textStyles={{ paddingBottom: 5 }}>
                Email:  <SmallText>
                {props.email}
            </SmallText>
            </BoldText>
                                  
            <BoldText textStyles={{ paddingBottom: 5 }}>
                Phone:  <SmallText>
                {props.phone}
            </SmallText>
            </BoldText>
                 
            </TenantView>
            </TenantRow>
    );
};

export default TenantItem;