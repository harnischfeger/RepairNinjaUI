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

interface Property{
  value: string, 
  label: string
}

interface NavProps{
  navigation : any;

}

interface TanantProps{
landlord_id: string; 
property_id: string; 
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
    property_id: Yup.string().required('Required'),
    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    email: Yup.string().required('Required'),
    phone: Yup.string().min(10, "PLease enter full phone number including area code").matches(phoneRegExp, "Please enter a valid phone number").required("Please enter a valid phone number")
});

const AddTenants: FunctionComponent<NavProps> = (_props) => {
    let route: RouteProp<{params: {id: string}}, 'params'> = useRoute();
    const landlord_id = route.params?.id; 
  const [isFocus, setIsFocus] = useState(false);
  const [error, setError] = useState(''); 
  const values ={
    landlord_id: "", 
    property_id: "",  
    firstname: "", 
    lastname: "",
    phone: "",
    email: "" 

  };

const [propertiesData, setPropertiesData] = useState<Array<Property>>([]); 
function getProperties(){

let url = "http://192.168.1.161:43700/api/properties/GetProperties"; 
axios.get(url)
.then(response => { 
    if(response.data !== '' && response.data.constructor === Object){
    let propertiesData: {value: string, label: string }[] = []; 
    for(var i=0; i< response.data.length; i++){
        propertiesData.push({
        value : response.data[i].id,
        label: response.data[i].address
        })
    }
    setPropertiesData(propertiesData)
    }  

})
.catch(error => alert(error.message + "\n"+ error.response.data ));
} 

      useEffect(()=>{
        getProperties()
        },[])

    return (   
        <Formik 
          initialValues={values} 
          enableReinitialize={true}
          validationSchema={TenantSchema}
          validateOnBlur={true}
          onSubmit={(values, {resetForm})  => {    
            values.landlord_id = landlord_id;            
            axios({
              method: 'POST',
              url: "http://192.168.1.161:43700/api/tenants/Post",
              data: values
            })
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
     <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={propertiesData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Property' : '...'}
          searchPlaceholder="Search..."
          value={props.values.property_id}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            props.setFieldValue("property_id", item.value);
            setIsFocus(false);
          }}
        />
      <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.property_id}</Text>
      </View>
      <View>
      <FormTextInput 
              value= {props.values.firstname}
              placeholder="Fist Name"
              placeholderTextColor="#000" 
              style={{width:300}}
              keyboardType = 'numeric'
              onChangeText={props.handleChange("firstname")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.firstname}</Text>
      </View>
      <View style={{   
        justifyContent: 'center',
      alignItems: 'center', }}>
            <FormTextInput 
              value= {props.values.lastname}
              placeholder="Last Name"
              placeholderTextColor="#000" 
              style={{width:300}}
              onChangeText={props.handleChange("lastname")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.lastname}</Text>
      </View>
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
export default AddTenants; 

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