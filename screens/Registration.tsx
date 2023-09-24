import React, {FunctionComponent, useState} from "react";
import {colors} from "../components/colors"; 
import { ImageBackground, View, Text} from "react-native";
import axios, { AxiosResponse } from "axios";
import styled from "styled-components/native";
import {Formik, FormikProps} from "formik"; 
import SubmitButton from "../components/Buttons/submitButton";
import {SegmentedButtons  } from 'react-native-paper';
import * as Yup from 'yup'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import FormTextInput from "../components/Inputs/FormTextInput";
import background from "./../assets/mobilelandlord.png";

interface FormProps{
FirstName: string;
LastName: string;  
Address: string; 
City: string; 
State: string; 
Zipcode: string,
User_id: string; 
Password: string; 
Phone: string; 
Email: string; 
isLandlord: boolean; 
isTenant: boolean;
isProvider: boolean;
ButtonChecked: string; 
}


const RegistrtionContainer= styled.View`
flex: 1;
flexDirection: row;
flexWrap: wrap;
justifyContent: space-around;
align-items: center;
margin-top: 30px;
`;
const TextArea = styled.View`
align-items: center;  
justifyContent: center; 
margin-bottom: 10px;
`;

const ButtonText = styled.Text`
font-size: 24px; 
`;

const SegBtnContainer = styled.View`
align-items: center;  
width: 300px; 
`;

const LoginContainer = styled.ImageBackground`
width:100%;
height: 100%;

`;

//for validation 
const phoneRegExp = /^(?!0+$)(?!1+$)((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const RegistrationSchema = Yup.object().shape({
  FirstName: Yup.string().required('Required'),
  LastName: Yup.string().required('Required'),
  Address: Yup.string().required('Required'),
  City: Yup.string().required('Required'),
  State: Yup.string().max(2).required('Required'),
  Zipcode: Yup.number().required('Required'),
  Phone: Yup.string().min(10, "PLease enter full phone number including area code").matches(phoneRegExp, "Please enter a valid phone number").required("Please enter a valid phone number"),
  Email: Yup.string().email('Invalid email').required('Required'),
  User_id: Yup.string().required('Required'),
  Password: Yup.string()
  .required("This field is required")
  .min(8, "Must be 8 or more characters")
  .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Must contain at least one uppercase and lowercase character")
  .matches(/\d/, "Must contain at least one number")
  .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Must contain at least one special character"),
  ButtonChecked: Yup.string().required("Please select one"),
});
const Registration: FunctionComponent = () => {
  const [error, setError] = useState(''); 
  const values ={
    FirstName: "",
    LastName: "",
    Address: "",
    City: "",
    State: "",
    Zipcode: "",
    User_id: "",
    Password: "",
    Phone: "",
    Email: "",
    isLandlord: false,
    isTenant: false,
    isProvider: false,
    ButtonChecked: ""
  };
    return (
   
   
        <Formik 
          initialValues={values} 
          enableReinitialize={true}
          validationSchema={RegistrationSchema}
          validateOnBlur={true}
          onSubmit={(values, {resetForm})  => {
            switch(values.ButtonChecked) {
              case ("isLandlord"):
                values.isLandlord = true; 
                break;
              case ("isTenant"):
                values.isTenant = true; 
                break;
                case ("isProvider"):
                  values.isProvider = true; 
                break;
              default:
                setError("Please select a role"); 
                break; 
            }
                 
            axios({
              method: 'POST',
              url: "http://192.168.1.161:43700/api/users/Post",
              data: values
            })
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

     <LoginContainer source={background} resizeMode="stretch">
     <KeyboardAwareScrollView>
       
        <RegistrtionContainer>
          <View>
            <FormTextInput 
              value= {props.values.FirstName}
              placeholder="First Name" 
              style={{width: 200}}
              onChangeText={props.handleChange("FirstName")}>
            </FormTextInput>       
            <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.FirstName}</Text>
          </View>
          <View>
            <FormTextInput 
              value= {props.values.LastName}
              placeholder="Last Name"
              style={{width: 200}}
              onChangeText={props.handleChange("LastName")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.LastName}</Text>    
          </View>
          <View>
            <FormTextInput 
              value= {props.values.Address}
              placeholder="Street Address"
              style={{width:405}}
              onChangeText={props.handleChange("Address")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.Address}</Text>
          </View>
          <View>
            <FormTextInput 
              value= {props.values.City}
              placeholder="City"
              style={{width:165}}
              onChangeText={props.handleChange("City")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.City}</Text>
          </View>
          <View>
            <FormTextInput 
              value= {props.values.State}
              placeholder="State"
              maxLength = {2}
              style={{width:55}}
              onChangeText={props.handleChange("State")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.State}</Text>
          </View>
          <View>
            <FormTextInput 
              value= {props.values.Zipcode}
              placeholder="Zipcode"
              style={{width:165}}
              onChangeText={props.handleChange("Zipcode")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.Zipcode}</Text>
          </View>
          <View>  
            <FormTextInput 
              value= {props.values.Phone}
              placeholder="Phone"
              keyboardType = 'phone-pad'
              maxLength = {10}
              style={{width:300}}
              onChangeText={props.handleChange("Phone")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.Phone}</Text>
          </View>
          <View>
            <FormTextInput 
              value= {props.values.Email}
              placeholder="Email"
              style={{width:300}}
              onChangeText={props.handleChange("Email")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.Email}</Text>
          </View>
          <View>
            <FormTextInput 
              value= {props.values.User_id}
              placeholder="User Name"
              style={{width:200}}
              onChangeText={props.handleChange("User_id")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.User_id}</Text>     
          </View>
          <View>
            <FormTextInput 
              value= {props.values.Password}
              placeholder="Password" password
              style={{width:200}}
              onChangeText={props.handleChange("Password")}>
            </FormTextInput>  
            <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.Password}</Text>     
          </View>   
      <SegBtnContainer>
        <TextArea>
          <ButtonText>I am a...</ButtonText>
          <Text>(Choose one)</Text>
        </TextArea>
        <SegmentedButtons
          value={props.values.ButtonChecked}
          onValueChange={props.handleChange("ButtonChecked")}
          theme={{ roundness: 1}}
          buttons={[
            {
              value: 'isLandlord',
              label: 'Landlord',
              showSelectedCheck: true,
              checkedColor: colors.redBtn,
              style: {
                backgroundColor: colors.white,                
              },
            },
            {
              value: 'isTenant',
              label: 'Tenant',
              showSelectedCheck: true,
              checkedColor: colors.redBtn,
              style: {
                backgroundColor: colors.white,                  
              },
            },
            { 
              value: 'isProvider', 
              label: 'Provider',
              showSelectedCheck: true,
              checkedColor: colors.redBtn,
              style: {
                backgroundColor: colors.white,             
              },
            },
          ]}
        />
         <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.ButtonChecked}</Text>
      </SegBtnContainer>
        <SubmitButton onPress={() => props.handleSubmit()}>Submit Registration</SubmitButton>
      </RegistrtionContainer>
      </KeyboardAwareScrollView>
    </LoginContainer>
   
      )}
        </Formik>
      
  );
};
export default Registration; 