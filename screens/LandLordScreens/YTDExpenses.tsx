import React, {FunctionComponent, useState} from "react";
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
import CRUDButton from "../../components/Buttons/CRUDButton";

interface NavProps{
  navigation : any;
}

interface ExpensesProps{ 
ytd_plumbing: number; 
ytd_hvac_heating: number; 
ytd_electirc: number; 
ytd_apliances: number;
ytd_roofing: number;
ytd_other: number;
}

const BackgroundContainer = styled.ImageBackground`
width:100%;
height: 100%;
`;

const TextContainer= styled.View`
margin-top: 30px;
padding: 15px;
`;
const ExpensesContainer = styled.View`
flex: 1;
flexDirection: row;
flexWrap: wrap;
justify-content: space-between; 
margin-Left: 10px; 
margin-Right: 10px; 
margin-bottom: 10px; 
border-radius: 5px; 
`;

const LeftView = styled.View`
justify-content: flex-start; 
flex: 2; 
`; 
const RightView = styled.View`
flex:1; 
`; 

const YTDExpenses: FunctionComponent<NavProps> = (_props) => {
  const [error, setError] = useState(''); 
  const values ={
    ytd_plumbing: 0, 
    ytd_hvac_heating: 0,
    ytd_electirc: 0,
    ytd_apliances: 0,
    ytd_roofing: 0,
    ytd_other: 0

  };
    return (   
        <Formik 
          initialValues={values} 
          enableReinitialize={true}
          validateOnBlur={true}
          onSubmit={(values, {resetForm})  => {  
            var url = "http://192.168.1.161:43700/api/expenses/PostYTD"; 
            axios.post(url,values,
              { headers: { 'Content-Type': 'multipart/form-data}' }})         
              .then(function (res) {
                resetForm();
                 alert('Year to Date Expenses successfully added!');  
              })
              .catch(function (res) {
                 console.log(res)
            });
          }}
          > 
              
     {(props: FormikProps<ExpensesProps>) => (

     <BackgroundContainer source={background} resizeMode="stretch">
     <KeyboardAwareScrollView>
      <TextContainer>
      <BoldText textStyles={{textAlign: 'center', fontSize:24}}> Enter Year to Date Expenses below </BoldText>
      <SmallText textStyles={{textAlign: 'center', marginTop: 10 }}>(Select the "Individual Expense"
      button to enter each Expense as a seperate occurrence)</SmallText>
      </TextContainer>
          <ExpensesContainer style={{marginTop: 50}}>
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
              value= {props.values.ytd_plumbing}
              style={{width: 132, 
                marginRight: 10, 
                height: 50}}
              onChangeText={props.handleChange("ytd_plumbing")}>
            </FormTextInput>          
            <FormTextInput 
              value= {props.values.ytd_hvac_heating}
              style={{width: 132, 
                marginRight: 10, 
                height: 50
              }}
              onChangeText={props.handleChange("ytd_hvac_heating")}>
            </FormTextInput>  
            <FormTextInput 
              value= {props.values.ytd_electirc}
              style={{width: 132, 
                marginRight: 10,    
                height:50}}
              onChangeText={props.handleChange("ytd_electirc")}>
            </FormTextInput> 
            <FormTextInput 
              value= {props.values.ytd_roofing}
              style={{width: 132,           
                marginRight: 10, 
                height: 50
              }}
              onChangeText={props.handleChange("ytd_roofing")}>
            </FormTextInput>  
            <FormTextInput 
              value= {props.values.ytd_other}
              style={{width: 132, 
                marginRight: 10, 
                height: 50
              }}
              onChangeText={props.handleChange("ytd_other")}>
            </FormTextInput>   
            </RightView>
            </ExpensesContainer>

            <CRUDButton onPress={() => _props.navigation.navigate('ManageProperties')}
                 btnStyles={{backgroundColor: colors.redBtn, alignSelf: 'center', 
                 marginTop:10, width: 200, borderRadius: 20}}
                 textStyles={{color: colors.white}}>
                Individual Expense
            </CRUDButton>
        <BasicButton 
        onPress={() => props.handleSubmit()}
        btnStyles={{backgroundColor:colors.managePropBtn}}
        textStyles={{color: colors.white}}
        >
          Save Changes          
        </BasicButton>
      


      </KeyboardAwareScrollView>
    </BackgroundContainer>
   
      )}
        </Formik>
      
  );
};
export default YTDExpenses; 