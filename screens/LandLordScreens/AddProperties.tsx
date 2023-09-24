import React, {FunctionComponent, useState} from "react";
import {colors} from "../../components/colors"; 
import {View, Text, StyleSheet} from "react-native";
import axios, { AxiosResponse } from "axios";
import styled from "styled-components/native";
import {Formik, FormikProps} from "formik"; 
import * as Yup from 'yup'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import FormTextInput from "../../components/Inputs/FormTextInput";
import background from "../../assets/mobilelandlord.png";
import BoldText from "../../components/Texts/BoldText";
import SmallText from "../../components/Texts/smallText";
import BasicButton from "../../components/Buttons/BasicButton";
import { RouteProp, useRoute } from "@react-navigation/native";

interface FormProps{
  landlord_id: string; 
    property_id: string; 
    type_of_service: string;
    message: string;
    phone: string;
    email: string;
    requesteddate_1: string;
    requesteddate_2: string;
    requesteddate_3: string;
    time_1:string;
    time_2:string;
    time_3:string;
}

const TopContainer= styled.View`
flex: 1;
flexDirection: row;
flexWrap: wrap;
justifyContent: space-around;
align-items: center;
margin-top: 30px;


`;
const CalendarContainer= styled.View`
flex: 1;
flexDirection: row;
flexWrap: wrap;
justifyContent: space-around;
align-items: center;
margin-top: 15px; 
`;

const BackgroundContainer = styled.ImageBackground`
width:100%;
height: 100%;

`;
interface NavProps{
  navigation : any;

}
interface Property{
  value: string, 
  label: string
}

interface Category{
  value: string, 
  label: string
}

const times = [
  { label: '8:00am - 12:00pm', value: '1' },
  { label: '12:00pm - 5:00pm', value: '2' },
];


//for validation 

const SubmitRequest: FunctionComponent<NavProps> = (_props) => {
  let route: RouteProp<{params: {id: string, isLandlord:boolean}}, 'params'> = useRoute();
  const landlord_id = route.params?.id; 
  const values ={
    landlord_id:"",
    property_id:"",
    phone: "",
    email: "",
    type_of_service: "",
    message: "",
    requesteddate_1:"",
    requesteddate_2:"",
    requesteddate_3:"",
    time_1:"",
    time_2:"",
    time_3:"",
  };


    return (
        <Formik 
          initialValues={values} 
          enableReinitialize={true}
          validateOnBlur={true}
          onSubmit={(values, {resetForm})  => {  
            values.landlord_id = landlord_id; 
            var url = "http://192.168.1.161:43700/api/requests/AddRequest"; 
            axios.post(url,values,
              { headers: { 'Content-Type': 'multipart/form-data}' }})
              .then(function (res) {
                resetForm();
                 alert('Successfully signed up!');  
              })
              .catch(function (res) {
                 console.log(res)
            });
          }}
          > 
              
     {(props: FormikProps<FormProps>) => (

     <BackgroundContainer source={background} resizeMode="stretch">
     <KeyboardAwareScrollView>
   

     
      <BasicButton 
        onPress={() => props.handleSubmit()}
        btnStyles={{backgroundColor:colors.managePropBtn}}
        textStyles={{color: colors.white}}
        >
          Submit Request         
        </BasicButton>
      </KeyboardAwareScrollView>
    </BackgroundContainer>
   
      )}
        </Formik>
      
  );
};
export default SubmitRequest; 

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  dropdown: {
    height:45,
    width:300, 
    borderColor: colors.managePropBtn,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 8,
    opacity: 0.8,
    backgroundColor: colors.white, 
  },
  placeholderStyle: {
    fontSize: 13
  },
  selectedTextStyle: {
    fontSize: 13,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  timeContainer: {
  },
  dropdownTime: {
    marginBottom: 5,
    height:43,
    width:160, 
    borderColor: colors.managePropBtn,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 8,
    opacity: 0.8,
    backgroundColor: colors.white, 
  },
  placeholderStyleTime: {
    fontSize: 13
  },
  selectedTextStyleTime: {
    fontSize: 13,
  },
});



