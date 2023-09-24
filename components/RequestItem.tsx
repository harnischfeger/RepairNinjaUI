import React, {FunctionComponent} from "react";
import styled from "styled-components/native";
import { colors } from "./colors";
import SmallText from "./Texts/smallText";
import BoldText from "./Texts/BoldText";
import { TouchableOpacity } from "react-native";
import Moment from "moment";

const RequestRow = styled.View`
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

const RequestView = styled.View`
padding-left: 10px;
`; 
 

interface ListProps{
    id: string; 
    tenant_id: string; 
    address: string; 
    city: string; 
    repair_type: string; 
    status: string; 
    created_date: string; 

  

}

const RequestItem: FunctionComponent<ListProps> = (props) => {
    return(
      
        <RequestRow>
            <BoldText textStyles={{ textAlign: "center", 
            paddingBottom: 5, 
            paddingTop:20, 
            width: "100%"}}
                >
            {props.address}, {props.city}
            </BoldText>
            <RequestView>
            <BoldText textStyles={{paddingBottom: 5 }}>
                Submited Date:  <SmallText>
                {Moment(props.created_date).format('MM-DD-YYYY')}
            </SmallText>
            </BoldText>
        
            <BoldText textStyles={{ paddingBottom: 5 }}>
                Repair Requested:  <SmallText>
                {props.repair_type}
            </SmallText>
            </BoldText>
                                  
            <BoldText textStyles={{ paddingBottom: 5 }}>
                Status:  <SmallText>
                {props.status}
            </SmallText>
            </BoldText> 
        </RequestView>
        </RequestRow>
    );
};

export default RequestItem;