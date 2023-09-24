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

interface EditProps{ 
id:string; 
address: string; 
city: string; 
state: string; 
zipcode: string;
rent: number;
taxes: number;
mortgage: number; 
insurance: number; 
hoa: number; 
landlord_id: string; 
}

const BackgroundContainer = styled.ImageBackground`
width:100%;
height: 100%;
`;

const AddressContainer= styled.View`
flex: 1;
flexDirection: row;
flexWrap: wrap;
justifyContent: space-around;
align-items: center;
margin-top: 30px;
`;

const EditContainer = styled.View`
flex: 1;
flexDirection: row;
flexWrap: wrap;
justify-content: space-between; 
margin-Top: 30px; 
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

const EditProperty: FunctionComponent = () => {
  const [error, setError] = useState(''); 
  const [property, setProperty] = useState({
    id:"", 
    address: "",
    city: "",
    state: "",
    zipcode: "",
    rent: 0,
    taxes: 0,
    mortgage: 0,
    insurance: 0, 
    hoa: 0, 
    landlord_id:""
  }); 

function getProperties(){
  let url = "http://192.168.1.161:43700/api/properties/GetProperties"; 
  axios.get(url)
  .then(response => { 
    //alert(JSON.stringify(response.data));  
    setProperty(response.data[0])
  })
  .catch(error => alert(error.message + "\n"+ error.response.data ));
} 
    useEffect(()=>{
      getProperties()
      },[])
  const values ={
    id:property.id, 
    address: property.address,
    city: property.city,
    state: property.state,
    zipcode: property.zipcode,
    rent: property.rent,
    taxes: property.taxes,
    mortgage: property.mortgage,
    insurance: property.insurance, 
    hoa: property.hoa, 
    landlord_id: property.landlord_id

  };
    return (   
        <Formik 
          initialValues={values} 
          enableReinitialize={true}
          validateOnBlur={true}
          onSubmit={(values, {resetForm})  => {                
            axios({
              method: 'UPDATE',
              url: "http://192.168.1.161:43700/api/properties/UpdateProperties",
              data: values
            })
              .then(function (res) {
                resetForm();
                 alert('Property successfully added!');  
              })
              .catch(function (res) {
                 console.log(res)
            });
          }}
          > 
              
     {(props: FormikProps<EditProps>) => (

     <BackgroundContainer source={background} resizeMode="stretch">
     <KeyboardAwareScrollView>
      <AddressContainer>
        <BoldText>{props.values.address} {props.values.city} {props.values.state} {props.values.zipcode}</BoldText>
        </AddressContainer> 
        <EditContainer>
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
              Rent:
          </BoldText>
          <BoldText textStyles={{textAlign: "left", 
          paddingBottom:10,
          paddingTop:15, 
          height:50,
          marginBottom: 5, 
          paddingLeft: 10,
          borderRadius: 10, 
          backgroundColor:"#daebf5"}}>
              Taxes:
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
              Mortgage:
          </BoldText>
          <BoldText textStyles={{textAlign: "left",
          paddingBottom:10,
          paddingTop:15, 
          height:50,
          marginBottom: 5, 
          paddingLeft: 10,
          borderRadius: 10, 
          backgroundColor:"#daebf5"}}>
              Insurance:
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
              HOA:
          </BoldText>
          </LeftView>
          <RightView>
          <FormTextInput 
            value= {props.values.rent}
            style={{width: 132, 
              marginRight: 10, 
              height: 50}}
            onChangeText={props.handleChange("rent")}>
          </FormTextInput>          
          <FormTextInput 
            value= {props.values.taxes}
            style={{width: 132, 
              marginRight: 10, 
              height: 50
            }}
            onChangeText={props.handleChange("taxes")}>
          </FormTextInput>  
          <FormTextInput 
            value= {props.values.mortgage}
            style={{width: 132, 
              marginRight: 10,
    
              height:50}}
            onChangeText={props.handleChange("mortgage")}>
          </FormTextInput> 
          <FormTextInput 
            value= {props.values.insurance}
            style={{width: 132,           
              marginRight: 10, 
              height: 50
            }}
            onChangeText={props.handleChange("insurance")}>
          </FormTextInput>  
          <FormTextInput 
            value= {props.values.hoa}
            style={{width: 132, 
              marginRight: 10, 
              height: 50
            }}
            onChangeText={props.handleChange("hoa")}>
          </FormTextInput>   
          </RightView>
          </EditContainer>
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
export default EditProperty; 