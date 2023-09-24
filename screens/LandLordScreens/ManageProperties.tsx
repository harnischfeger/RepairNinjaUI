import React, {FunctionComponent, useState, useEffect} from "react";
import { Container } from "./../../components/shared"; 
import BasicButton from "./../../components/Buttons/BasicButton";
import {colors} from "./../../components/colors"; 
import { ImageBackground, TouchableOpacity} from "react-native";
import axios, { AxiosResponse } from "axios";
import styled from "styled-components/native";
import PropertyItem from "../../components/PropertyItem";
import background from "../../assets/mobilelandlord.png";  
import CRUDButton from "../../components/Buttons/CRUDButton";
import { RouteProp, useRoute } from "@react-navigation/native";

const BackGroundContainer = styled.ImageBackground`
width:100%;
height: 100%;
`;


const GraphContainer = styled.View`
background-color: pink; 
flex:1; 
width: 100%;
max-height: 40%; 
`;

const PropertyList = styled.FlatList`
margin-top: 10px; 
width: 100%;
flex:1; 
`;

interface PropertiesProps{
    navigation : any;
}


const ManageProperties = (props:PropertiesProps) => {
  let route: RouteProp<{params: {id: string}}, 'params'> = useRoute();
  const id = route.params?.id; 
    const [userId, setUserid] = useState(); 
    const [properties, setProperties] = useState([]); 

function getProperties(){
    let url = "http://192.168.1.161:43700/api/properties/GetById?id=" + id; 
    axios.get(url)
    .then(response => { 
      //alert(JSON.stringify(response.data));  
      setProperties(response.data)
    })
    .catch(error => alert(error.message + "\n"+ error.response.data ));
  } 
      useEffect(()=>{
        getProperties()
        },[])
    
  function pressHandler(itemId: any, _props: any){
    //setUserid()
    _props.navigation.navigate('PropertyDetails', {itemId: itemId}); 
  }

    return (
        <BackGroundContainer source={background} resizeMode="stretch">

           {/* <BasicButton onPress={() => props.navigation.navigate('ManageProperties')}>
                Add Property
            </BasicButton> */}
        <GraphContainer>

        </GraphContainer>
        
           <CRUDButton onPress={() => props.navigation.navigate('AddProperty', {id: id})}
                 btnStyles={{backgroundColor: colors.managePropBtn, alignSelf: 'flex-end', 
                 marginRight:25, marginTop:10}}
                 textStyles={{color: colors.white}}>
                Add 
            </CRUDButton>
      <PropertyList
        data={properties}
        contentContainerStyle={{marginLeft: 25, marginRight:25}}
        keyExtractor={({id}: any) => id}
        renderItem={({item}: any) =>   
        <TouchableOpacity onPress={() => pressHandler(item.id, props)}>
          <PropertyItem {...item}/>
        </TouchableOpacity>} 
      />

    </BackGroundContainer>
    );

};

export default ManageProperties; 