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
import { RouteProp, useRoute } from "@react-navigation/native";
import { ConfirmDialog } from 'react-native-simple-dialogs';

interface AddProps{ 
address: string; 
city: string; 
state: string; 
zipcode: string;
rent: number;
taxes: number;
mortgage: number; 
intial_maint_cost: number; 
insurance: number; 
hoa: number; 
landlord_id: string; 
}

interface NavProps{
  navigation : any;


}
const BackgroundContainer = styled.ImageBackground`
width:100%;
height: 100%;
`;

const AddContainer= styled.View`
flex: 1;
flexDirection: row;
flexWrap: wrap;
justifyContent: space-around;
align-items: center;
margin-top: 30px;
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


//for validation 
const AddSchema = Yup.object().shape({
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().max(2).required('Required'),
  zipcode: Yup.number().required('Required'),

});
  const AddProperty: FunctionComponent<NavProps> = (_props) => {
    let route: RouteProp<{params: {id: string}}, 'params'> = useRoute();
    const landlord_id = route.params?.id; 
    const [dialogVisible, setDialogVisible] = useState<boolean>(true)
  const [error, setError] = useState(''); 
  const values ={
    address: "",
    city: "",
    state: "",
    zipcode: "",
    rent: 0,
    taxes: 0,
    mortgage: 0,
    intial_maint_cost: 0, 
    insurance: 0, 
    hoa: 0, 
    landlord_id: ""

  };

  function addExpenses(){
     _props.navigation.navigate('YTDExpenses');
  }
    return (   
        <Formik 
          initialValues={values} 
          enableReinitialize={true}
          validationSchema={AddSchema}
          validateOnBlur={true}
          onSubmit={(values, {resetForm})  => {   
            values.landlord_id = landlord_id;                 
            var url = "http://192.168.1.161:43700/api/properties/Post"; 
            axios.post(url,values,
              { headers: { 'Content-Type': 'multipart/form-data}' }})
              .then(function (res) {
                resetForm();
                setDialogVisible(true)
              })
              .catch(function (res) {
                 console.log(res)
            });
          }}
          > 
              
     {(props: FormikProps<AddProps>) => (

     <BackgroundContainer source={background} resizeMode="stretch">
     <KeyboardAwareScrollView>
 

        <AddContainer>
        <ConfirmDialog
    title="Success!"
    message={("Would you like to add expenses for this property now?" + "\n" +  "\n" +
    "This can be done at any time through the Add Expenses button."
    )}
    visible={dialogVisible}
    onTouchOutside={() => setDialogVisible(false)}
    positiveButton={{
        title: "YES",
        onPress: () => addExpenses()
    }}
    negativeButton={{
        title: "NO",
        onPress: () => alert("No touched!")
    }}
/>
          <View>
            <FormTextInput 
              value= {props.values.address}
              placeholder="Street Address"
              style={{width:405}}
              onChangeText={props.handleChange("address")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.address}</Text>
          </View>
          <View>
            <FormTextInput 
              value= {props.values.city}
              placeholder="City"
              style={{width:165}}
              onChangeText={props.handleChange("city")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.city}</Text>
          </View>
          <View>
            <FormTextInput 
              value= {props.values.state}
              placeholder="State"
              maxLength = {2}
              style={{width:55}}
              onChangeText={props.handleChange("state")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.state}</Text>
          </View>
          <View>
            <FormTextInput 
              value= {props.values.zipcode}
              placeholder="Zipcode"
              style={{width:165}}
              onChangeText={props.handleChange("zipcode")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red'}}>{props.errors.zipcode}</Text>
          </View>
          </AddContainer> 
          <ExpensesContainer>
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
            </ExpensesContainer>
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
export default AddProperty; 