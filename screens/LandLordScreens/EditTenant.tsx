import React, {FunctionComponent, useEffect, useState} from "react";
import {colors} from "../../components/colors"; 
import {StyleSheet, View, Text, TextInput} from "react-native";
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
import StyledTextInput from "../../components/Inputs/StyledTextInput";
import { Dropdown} from 'react-native-element-dropdown';
import { RouteProp, useRoute } from "@react-navigation/native";


interface NavProps{
  navigation : any;

}

interface TanantProps{
id:string; 
landlord_id: string; 
property_id: string; 
address: string; 
city: string; 
firstname: string; 
lastname: string; 
phone: string; 
email: string; 
  }

const BackgroundContainer = styled.ImageBackground`
width:100%;
height: 100%;
`;

const TenantContainer= styled.View`
flex: 1;
flexDirection: row;
flexWrap: wrap;
justifyContent: space-around;
align-items: center;
margin-top: 50px;
`;

const phoneRegExp = /^(?!0+$)(?!1+$)((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const TenantSchema = Yup.object().shape({

});

const EditTenants: FunctionComponent<NavProps> = (_props) => {
    let route: RouteProp<{params: {id: string}}, 'params'> = useRoute();
    const tenant_id = route.params?.id; 
  const [isFocus, setIsFocus] = useState(false);
  const [tenantData, setTenantData] = useState(null); 
  const [error, setError] = useState(''); 
  const values ={
    id: "",
    landlord_id: "", 
    property_id: "",  
    address: "",
    city: "",
    firstname: "", 
    lastname: "",
    phone: "",
    email: "" 

  };


function getTenant(){
let url = "http://192.168.1.161:43700/api/tenants/GetById?id=" + tenant_id; 
axios.get(url)
.then(response => { 
    if(response.data !== '' && response.data.constructor === Object){
        setTenantData(response.data);   
    }
})
.catch(error => alert(error.message + "\n"+ error.response.data ));
} 

      useEffect(()=>{
        getTenant()
        },[])

    return (   
        <Formik 
          initialValues={values} 
          enableReinitialize={true}
          validationSchema={TenantSchema}
          validateOnBlur={true}
          onSubmit={(values, {resetForm})  => { 
            var url = "http://192.168.1.161:43700/api/tenants/Update";            
            axios.post(url,values,
              { headers: { 'Content-Type': 'multipart/form-data}' }})
              .then(function (res) {
                resetForm();
                 alert('Tenant successfully added!');  
              })
              .catch(function (res) {
                 console.log(res)
            });
          }}
          > 
              
     {(props: FormikProps<TanantProps>) => (

     <BackgroundContainer source={background} resizeMode="stretch">
     <KeyboardAwareScrollView>
     <TenantContainer>
     <BoldText textStyles={{ textAlign: "center", 
            paddingBottom: 5, 
            paddingTop:10, 
            width: "100%"}}
                >
            {props.values.address}, {props.values.city}
            </BoldText>   

            <BoldText textStyles={{ textAlign: "center", 
            paddingBottom: 5, 
            paddingTop:10, 
            width: "100%"}}
                >
            {props.values.firstname} {props.values.lastname}
            </BoldText>   
      <View style={{   
        justifyContent: 'center',
      alignItems: 'center', }}>
            <FormTextInput 
              value= {props.values.email}
              placeholder="Email"
              placeholderTextColor="#000" 
              style={{width:300}}
              onChangeText={props.handleChange("email")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.email}</Text>
      </View>
      <View style={{   
        justifyContent: 'center',
      alignItems: 'center', }}>
            <FormTextInput 
              value= {props.values.phone}
              placeholder="Tenant Phone Number"
              placeholderTextColor="#000" 
              style={{width:300}}
              onChangeText={props.handleChange("phone")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.phone}</Text>
      </View>
     
      <BasicButton 
        onPress={() => props.handleSubmit()}
        btnStyles={{backgroundColor:colors.managePropBtn}}
        textStyles={{color: colors.white}}
        >
          Save Changes          
        </BasicButton>
        </TenantContainer>
      </KeyboardAwareScrollView>
    </BackgroundContainer>
   
      )}
        </Formik>
      
  );
};
export default EditTenants; 

const styles = StyleSheet.create({
  container: {
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
  });