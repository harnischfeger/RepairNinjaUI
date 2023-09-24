import React, {FunctionComponent, useState, useEffect} from "react";
import { Container } from "../components/shared"; 
import BasicButton from "../components/Buttons/BasicButton";
import {colors} from "../components/colors"; 
import { ImageBackground, TouchableOpacity} from "react-native";
import axios, { AxiosResponse } from "axios";
import styled from "styled-components/native";
import RequestItem from "../components/RequestItem";
import background from "./../assets/mobilelandlord.png";  
import { RouteProp, useRoute } from "@react-navigation/native";

const BackGroundContainer = styled.ImageBackground`
width:100%;
height: 100%;
`;

const RequestList = styled.FlatList`
margin-top: 10px; 
width: 100%;
flex:1; 
`;

interface NavProps{
    navigation : any;
}


  const RequestView: FunctionComponent<NavProps> = (_props) => {
  let route: RouteProp<{params: {id: string}}, 'params'> = useRoute();
  const id = route.params?.id; 
    const [userId, setUserid] = useState(""); 
    const [requests, setRequests] = useState([]); 

function getRequests(){
  setUserid("71966ec2-640a-4f6e-b33f-53fae33b1d42"); 
  let url = "http://192.168.1.161:43700/api/requests/GetAllRequests?landlord_id=" + id; 
    axios.get(url)
    .then(response => { 
      //alert(JSON.stringify(response.data));  
      setRequests(response.data)
    })
    .catch(error => alert(error.message + "\n"+ error.response.data ));
  } 
      useEffect(()=>{
        getRequests()
        },[])
    
  function pressHandler(itemId: any, _props: any){
    //setUserid()
    _props.navigation.navigate('LandlordDashboard'); 
  }

    return (
        <BackGroundContainer source={background} resizeMode="stretch">
      <RequestList
        data={requests}
        contentContainerStyle={{marginLeft: 10, marginRight:10}}
        keyExtractor={({id}: any) => id}
        renderItem={({item}: any) =>   
        <TouchableOpacity onPress={() => pressHandler(item.id, _props)}>
          <RequestItem {...item}/>
        </TouchableOpacity>} 
      />

    </BackGroundContainer>
    );

};

export default RequestView; 