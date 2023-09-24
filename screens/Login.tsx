import React, {FunctionComponent, useState, useEffect} from "react";
import axios, { AxiosResponse } from "axios";
import styled from "styled-components/native";
import StyledTextInput from "../components/Inputs/StyledTextInput"; 
import LandlordDashboard from "./LandlordDashboard"
import SubmitButton from "../components/Buttons/submitButton";
import { RootstackParamList } from "../navigators/RootStack";
import { useNavigate } from "react-router-dom";
import {useNavigation} from "@react-navigation/native";
import background from "./../assets/mobilelandlord.png";  



function getUserId(userName: string, password: string, _props: any){
    let url = "http://192.168.1.161:43700/api/users/GetByUserName?userName=" + userName + "&password=" + password; 
    axios.get(url)
    .then(response => { 
      //alert(JSON.stringify(response.data));  
      let res = response.data[0]; 
      if(res.is_landlord){
        let landlord_id = res.id; 
        _props.navigation.navigate('LandlordDashboard', {id: landlord_id}); 
        
    }
    })
    .catch(error => alert(error.message + "\n"+ error.response.data ));
  }

const LoginContainer = styled.ImageBackground`
width:100%;
height: 100%;
`;
const ContainerWrapper = styled.View`
margin-top:50%
flex: 1;
`;

interface LoginProps {
    navigation: any; 
}


const Login = (props: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
        <LoginContainer source={background} resizeMode="stretch">
            <ContainerWrapper>
            <StyledTextInput 
                label="Email Address" 
                value={email}
                onChangeText={setEmail}
                placeholder="example@example.com"
                keyboardType="email-address"
                style={{marginBottom: 20}}

            /> 

            <StyledTextInput 
                label="Password" 
                value={password}
                onChangeText={setPassword}
                keyboardType="default"
                style={{marginBottom: 20}}

            /> 
                 <SubmitButton onPress={() => getUserId(email, password, props)}>
                    Login
                 </SubmitButton>
            </ContainerWrapper>
          
        </LoginContainer>
   
        
        </>
    );

};

export default Login;