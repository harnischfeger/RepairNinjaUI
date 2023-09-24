import React, {FunctionComponent, useState, useEffect} from "react";
import {colors} from "../../components/colors"; 
import {TouchableOpacity, View, StyleSheet} from "react-native";
import axios from "axios";
import styled from "styled-components/native";
import background from "./../../assets/mobilelandlord.png";
import { RouteProp, useRoute } from "@react-navigation/native";
import TenantItem from "../../components/TenantItem";
import CRUDButton from "../../components/Buttons/CRUDButton";
import BasicButton from "../../components/Buttons/BasicButton";

const BackGroundContainer = styled.ImageBackground`
width:100%;
height: 100%;
`;

const TenantList = styled.FlatList`
margin-top: 10px; 
width: 100%;
flex:1; 
`;

interface TenantsProps{
    navigation : any;
}


const ViewTenants = (props:TenantsProps) => {
  let route: RouteProp<{params: {id: string}}, 'params'> = useRoute();
  const landlord_id = route.params?.id; 
  const [tenants, setTenants] = useState<any>([]); 

function getTenants(){
  let url = "http://192.168.1.161:43700/api/tenants/GetTenantsById?landlord_id=" + landlord_id; 
    axios.get(url)
    .then(response => { 
      setTenants(response.data)
    })
    .catch(error => alert(error.message + "\n"+ error.response.data ));
  } 
      useEffect(()=>{
        getTenants()
        },[])
    
  function editHandler(itemId: any, _props: any){
    let tenant_id = itemId; 
    _props.navigation.navigate('EditTenant', {id: tenant_id}); 
  }

  function deleteHandler(itemId: any, _props: any){
    let tenant_id = itemId.id; 
    let url = "http://192.168.1.161:43700/api/tenants/Delete?tenant_id=" + tenant_id; 
    axios.delete(url)
    .then(response => { 
      if(response.data != ""){
        getTenants(); 
      alert('Tenant successfully deleted!');  
      }
      
    })
    .catch(error => alert(error.message + "\n"+ error.response.data ));
  }

    return (
        <BackGroundContainer source={background} resizeMode="stretch">
                 <CRUDButton onPress={() => props.navigation.navigate('AddTenants', {id: landlord_id})}
                 btnStyles={{backgroundColor: colors.managePropBtn, alignSelf: 'center', 
                 marginTop:10, width: 200}}
                 textStyles={{color: colors.white}}>
                Add New Tenant
            </CRUDButton>
      <TenantList
        data={tenants}
        contentContainerStyle={{marginLeft: 10, marginRight:10}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}: any) =>   
          <>
          <TenantItem {...item}>
          </TenantItem>
          <View style={styles.buttonView}>
          <CRUDButton onPress={() => editHandler(item.id, props)}
            btnStyles={{height:40,
              backgroundColor: colors.managePropBtn
            }}
            textStyles={{ color: colors.white }}
          >Edit</CRUDButton>
          <CRUDButton onPress={() => deleteHandler(item, props)}
            btnStyles={{height:40,
              backgroundColor: colors.submitBtnLand
            }}
            textStyles={{ color: colors.white }}
          >Delete</CRUDButton>
      </View>
          </>
          } 
        
      />

    </BackGroundContainer>
    );

};

export default ViewTenants; 

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 165,
    marginTop:105, 
    position:"absolute",
    alignSelf: 'flex-end'

  }
});