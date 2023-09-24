import React, {FunctionComponent, useEffect, useState} from "react";
import {colors} from "../../components/colors"; 
import {View, Text} from "react-native";
import axios, { AxiosResponse } from "axios";
import styled from "styled-components/native";
import {Formik, FormikProps} from "formik"; 
import * as Yup from 'yup'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import FormTextInput from "../../components/Inputs/FormTextInput";
import background from "./../../assets/mobilelandlord.png";
import BoldText from "../../components/Texts/BoldText";
import SmallText from "../../components/Texts/smallText";
import BasicButton from "../../components/Buttons/BasicButton";
import { RouteProp, useRoute } from "@react-navigation/native";

interface AddProps{ 
address: string; 
city: string; 
state: string; 
zipcode: string;
rent: number;
taxes: number;
mortgage: number; 
intial_maint_cost: number; 
insurance: number; 
hoa: number; 
landlord_id: string; 
}

const BackgroundContainer = styled.ImageBackground`
width:100%;
height: 100%;
`;
const GraphContainer = styled.View`
background-color: pink; 
flex:1; 
width: 100%;
max-height: 40%; 
`;
const PropertyView = styled.View`
opacity: 0.8;
padding-left: 15px;
padding-right: 15px; 
flex-direction: row; 
justify-content: space-between; 
align-items: center; 
width: 100%; 
margin-top: 20px; 
`;


const LeftView = styled.View`
justify-content: flex-start; 
flex: 2; 
`; 
const RightView = styled.View`
flex:1; 
`; 
interface PropertyExpenesProps{ 
    ytd_plumbing: number; 
    ytd_hvac_heating: number; 
    ytd_electirc: number; 
    ytd_apliances: number;
    ytd_roofing: number;
    ytd_other: number;
    }

const PropertyDetails = () => {
    let route: RouteProp<{params: {itemId: string}}, 'params'> = useRoute();
    const itemId = route.params?.itemId; 
    const [property, setProperty] = useState([]); 
    function getProperties(){
        let url = "http://192.168.1.161:43700/api/properties/GetById?id=" + itemId; 
        axios.get(url)
        .then(response => { 
          //alert(JSON.stringify(response.data));  
          setProperty(response.data)
        })
        .catch(error => alert(error.message + "\n"+ error.response.data ));
      } 
          useEffect(()=>{
            getProperties()
            },[])
  
    return (   
       

     <BackgroundContainer source={background} resizeMode="stretch">
           <GraphContainer>

        </GraphContainer>
     <KeyboardAwareScrollView>
      <PropertyView>
          <LeftView>
              <BoldText textStyles={{textAlign: "left", 
              paddingBottom:10,
              paddingTop:15, 
              height:50,
              marginBottom: 5, 
              paddingLeft: 10,
              borderRadius: 10,
              opacity: 0.8,
              backgroundColor:colors.white}}>
                  Plumbing:
              </BoldText>
              <BoldText textStyles={{textAlign: "left", 
              paddingBottom:10,
              paddingTop:15, 
              height:50,
              marginBottom: 5, 
              paddingLeft: 10,
              borderRadius: 10, 
              opacity: 0.8,
              backgroundColor:colors.white}}>
                  HVAC/Heating:
              </BoldText>
              <BoldText textStyles={{textAlign: "left",
              paddingBottom:10,
              paddingTop:15, 
              height:50,
              marginBottom: 5, 
              paddingLeft: 10,
              opacity: 0.8,
              borderRadius: 10, 
              backgroundColor:colors.white}}>
                  Electric:
              </BoldText>
              <BoldText textStyles={{textAlign: "left",
              paddingBottom:10,
              paddingTop:15, 
              height:50,
              marginBottom: 5, 
              paddingLeft: 10,
              opacity: 0.8,
              borderRadius: 10, 
              backgroundColor:colors.white}}>
                  Roofing:
              </BoldText>
              <BoldText textStyles={{textAlign: "left",
              paddingBottom:10,
              paddingTop:15, 
              height:50,
              marginBottom: 5, 
              paddingLeft: 10,
              opacity: 0.8,
              borderRadius: 10, 
              backgroundColor:colors.white}}>
                  Other:
              </BoldText>
              </LeftView>
              <RightView>
              <FormTextInput 
                value= {''}
                style={{width: 132, 
                  marginRight: 10, 
                  height: 50}}>
              </FormTextInput>          
              <FormTextInput 
                value= {''}
                style={{width: 132, 
                  marginRight: 10, 
                  height: 50
                }}>
              </FormTextInput>  
              <FormTextInput 
                value= {''}
                style={{width: 132, 
                  marginRight: 10,    
                  height:50}}>
              </FormTextInput> 
              <FormTextInput 
                value= {''}
                style={{width: 132,           
                  marginRight: 10, 
                  height: 50
                }}>
              </FormTextInput>  
              <FormTextInput 
                value= {''}
                style={{width: 132, 
                  marginRight: 10, 
                  height: 50
                }}>
              </FormTextInput>   
              </RightView>
          </PropertyView>
      </KeyboardAwareScrollView>
    </BackgroundContainer>

      
  );
};
export default PropertyDetails; 