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
import SmallText from "../../components/Texts/SmallText";
import BasicButton from "../../components/Buttons/BasicButton";
import CRUDButton from "../../components/Buttons/CRUDButton";
import StyledTextInput from "../../components/Inputs/StyledTextInput";
import { Dropdown} from 'react-native-element-dropdown';

interface Category{
  value: string, 
  label: string
}

interface NavProps{
  navigation : any;

}

interface ExpensesProps{
landlord_id: string; 
property_id: string; 
provider_id: string; 
expense_type: string; 
repair_type: string; 
amount: string; 
invoice_img: string; 
  }

const BackgroundContainer = styled.ImageBackground`
width:100%;
height: 100%;
`;

const IndExpenseContainer= styled.View`
flex: 1;
flexDirection: row;
flexWrap: wrap;
justifyContent: space-around;
align-items: center;
margin-top: 50px;
`;

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const IndExpenseSchema = Yup.object().shape({
    expense_type: Yup.string().required('Required'),
    repair_type: Yup.string().required('Required'),
    amount: Yup.string().required('Required'),
    invoice_img: Yup.string().required('Required'),
  });

const IndividualExpense: FunctionComponent<NavProps> = (_props) => {
  const [isFocus, setIsFocus] = useState(false);
  const [error, setError] = useState(''); 
  const values ={
    landlord_id: "", 
    property_id: "",  
    provider_id: "",  
    expense_type: "",  
    repair_type: "",  
    amount: "", 
    invoice_img: "" 

  };

  const [categories, setCategories] = useState<Array<Category>>([]); 
function getCategories(){

  let url = "http://192.168.1.161:43700/api/Categories/GetCategories"; 
  axios.post(url)
  .then(response => { 
    if(response.data.length > 0){
     let catData: {value: string, label: string }[] = []; 
      for(var i=0; i< response.data.length; i++){
        catData.push({
          value : response.data[i].id,
          label: response.data[i].cat_itemname
        })
      }
      setCategories(catData)
    }  

  })
  .catch(error => alert(error.message + "\n"+ error.response.data ));
} 

      useEffect(()=>{
        getCategories()
        },[])

    return (   
        <Formik 
          initialValues={values} 
          enableReinitialize={true}
          validationSchema={IndExpenseSchema}
          validateOnBlur={true}
          onSubmit={(values, {resetForm})  => {               
            axios({
              method: 'POST',
              url: "http://192.168.1.161:43700/api/ytd_expenses/Post",
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
              
     {(props: FormikProps<ExpensesProps>) => (

     <BackgroundContainer source={background} resizeMode="stretch">
     <KeyboardAwareScrollView>
     <IndExpenseContainer>
     <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Expense Type' : '...'}
          searchPlaceholder="Search..."
          value={props.values.expense_type}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            props.setFieldValue("type_of_service", item.value);
            setIsFocus(false);
          }}
        />
      <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.expense_type}</Text>
      </View>

      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={categories}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Repair Type' : '...'}
          searchPlaceholder="Search..."
          value={props.values.repair_type}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            props.setFieldValue("repair_type", item.value);
            setIsFocus(false);
          }}
        />
            <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.repair_type}</Text>
      </View>

      <View>
      <FormTextInput 
              value= {props.values.amount}
              placeholder="Amount"
              placeholderTextColor="#000" 
              style={{width:300}}
              keyboardType = 'numeric'
              onChangeText={props.handleChange("amount")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.amount}</Text>
      </View>
      <View style={{   
        justifyContent: 'center',
      alignItems: 'center', }}>
            <FormTextInput 
              value= {props.values.invoice_img}
              placeholder="invoice_img"
              placeholderTextColor="#000" 
              style={{width:300}}
              onChangeText={props.handleChange("invoice_img")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.invoice_img}</Text>
      </View>
     
      <BasicButton 
        onPress={() => props.handleSubmit()}
        btnStyles={{backgroundColor:colors.managePropBtn}}
        textStyles={{color: colors.white}}
        >
          Save Changes          
        </BasicButton>
        </IndExpenseContainer>
      </KeyboardAwareScrollView>
    </BackgroundContainer>
   
      )}
        </Formik>
      
  );
};
export default IndividualExpense; 

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