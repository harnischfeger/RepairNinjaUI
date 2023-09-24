import React, {FunctionComponent, useEffect, useState} from "react";
import {colors} from "../components/colors"; 
import { StyleSheet, View, Text, TextInput, Pressable} from "react-native";
import axios, { AxiosResponse } from "axios";
import styled from "styled-components/native";
import {Formik, FormikProps, useFormik, useFormikContext, withFormik} from "formik"; 
import SubmitButton from "../components/Buttons/submitButton";
import * as Yup from 'yup'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import FormTextInput from "../components/Inputs/FormTextInput";
import background from "../assets/mobilelandlord.png";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import BasicButton from "../components/Buttons/BasicButton";
import { RouteProp, useRoute } from "@react-navigation/native";

interface FormProps{
  landlord_id: string; 
    property_id: string; 
    type_of_service: string;
    message: string;
    phone: string;
    email: string;
    requesteddate_1: string;
    requesteddate_2: string;
    requesteddate_3: string;
    time_1:string;
    time_2:string;
    time_3:string;
}

const TopContainer= styled.View`
flex: 1;
flexDirection: row;
flexWrap: wrap;
justifyContent: space-around;
align-items: center;
margin-top: 30px;


`;
const CalendarContainer= styled.View`
flex: 1;
flexDirection: row;
flexWrap: wrap;
justifyContent: space-around;
align-items: center;
margin-top: 15px; 
`;

const BackgroundContainer = styled.ImageBackground`
width:100%;
height: 100%;

`;
interface NavProps{
  navigation : any;

}
interface Property{
  value: string, 
  label: string
}

interface Category{
  value: string, 
  label: string
}

const times = [
  { label: '8:00am - 12:00pm', value: '1' },
  { label: '12:00pm - 5:00pm', value: '2' },
];


//for validation 
const phoneRegExp = /^(?!0+$)(?!1+$)((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const SubmitRequestSchema = Yup.object().shape({
  property_id: Yup.string().required('Required'),
  phone: Yup.string().min(10, "Area code required").matches(phoneRegExp, "Invalid phone number").required("Required"),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().required('Description Required'),
  type_of_service: Yup.string().required('Required'),
  requesteddate_1: Yup.string().required('Required'),
  time_1: Yup.string().required('Required'),
  requesteddate_2: Yup.string().required('Required'),
  time_2: Yup.string().required('Required'),
  requesteddate_3: Yup.string().required('Required'),
  time_3: Yup.string().required('Required'),
});
const SubmitRequest: FunctionComponent<NavProps> = (_props) => {
  let route: RouteProp<{params: {id: string, isLandlord:boolean}}, 'params'> = useRoute();
  const landlord_id = route.params?.id; 
  const isLandlord = route.params?.isLandlord; 
  //const [startDate, setStartDate] = useState(new Date());
  const [showDate1, setShowDate1] = useState(false);
  const [showDate2, setShowDate2] = useState(false);
  const [showDate3, setShowDate3] = useState(false);
  const [date_1, setDate_1] = useState(new Date());
  const [date_2, setDate_2] = useState(new Date());
  const [date_3, setDate_3] = useState(new Date());
  //const [selectedDate, setSelectedDate] = useState(new Date());
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusTime, setIsFocusTime] = useState(false);
  const [isFocusTime2, setIsFocusTime2] = useState(false);
  const [isFocusTime3, setIsFocusTime3] = useState(false);
  const [error, setError] = useState(''); 
  const [placeColor, setPlaceColor] = useState("light grey"); 
  const [placeColor2, setPlaceColor2] = useState("light grey"); 
  const [placeColor3, setPlaceColor3] = useState("light grey"); 
  const today = new Date()
  const values ={
    landlord_id:"",
    property_id:"",
    phone: "",
    email: "",
    type_of_service: "",
    message: "",
    requesteddate_1:"",
    requesteddate_2:"",
    requesteddate_3:"",
    time_1:"",
    time_2:"",
    time_3:"",
  };

  const [propertiesData, setPropertiesData] = useState<Array<Property>>([]); 
function getProperties(){

let url = "http://192.168.1.161:43700/api/properties/GetById?id=" + landlord_id; 
axios.get(url)
.then(response => { 
    if(response.data !== ''){
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

  const [categories, setCategories] = useState<Array<Category>>([]); 
function getCategories(){
let cat_itemname = "RepairType";
  let url = "http://192.168.1.161:43700/api/Categories/GetCategories?cat_name=" + cat_itemname; 
  axios.get(url)
  .then(response => { 
    if(response.data !== ''){
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
        getProperties()
        },[])

    const toggleDatepicker1 = () => {
      setShowDate1(!showDate1); 
    }; 
    const toggleDatepicker2 = () => {
      setShowDate2(!showDate2); 
    }; 
    const toggleDatepicker3 = () => {
      setShowDate3(!showDate3); 
    }; 
    return (
        <Formik 
          initialValues={values} 
          enableReinitialize={true}
          validationSchema={SubmitRequestSchema}
          validateOnBlur={true}
          onSubmit={(values, {resetForm})  => {  
            values.landlord_id = landlord_id; 
            var url = "http://192.168.1.161:43700/api/requests/AddRequest"; 
            axios.post(url,values,
              { headers: { 'Content-Type': 'multipart/form-data}' }})
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

     <BackgroundContainer source={background} resizeMode="stretch">
     <KeyboardAwareScrollView>
     <TopContainer>

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
            <FormTextInput 
              value= {props.values.phone}
              placeholder="Phone"
              keyboardType = 'phone-pad'
              maxLength = {10}
              style={{width:200}}
              onChangeText={props.handleChange("phone")}>
            </FormTextInput>
           
            <FormTextInput 
              value= {props.values.email}
              placeholder="Email"
              style={{width:200}}
              onChangeText={props.handleChange("email")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red', display: "flex", width:200}}>{props.errors.phone}</Text>
            <Text style={{textAlign: 'center', color: 'red', display:"flex", width:200}}>{props.errors.email}</Text>

  
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
          value={props.values.type_of_service}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            props.setFieldValue("type_of_service", item.value);
            setIsFocus(false);
          }}
        />
      <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.type_of_service}</Text>
      </View>
      <FormTextInput 
              value= {props.values.message}
              multiline 
              numberOfLines={5}
              placeholder="Please describe issue"
              style={{width:390,textAlignVertical: 'top'}}
              onChangeText={props.handleChange("message")}>
            </FormTextInput>
            <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.message}</Text>
      </TopContainer>
      <CalendarContainer>
      {showDate1 && (
          <DateTimePicker
            mode="date"
            display="default"
            value={date_1}
            onChange={({type}, selectedDate) => {
              if(type == "set"){
                setShowDate1(!showDate1);
                const currentDate = selectedDate ? selectedDate : new Date(); 
                setDate_1(currentDate); 
                setPlaceColor("black"); 
                props.setFieldValue("requesteddate_1", currentDate.toDateString());
              }
              else{
                toggleDatepicker1(); 
              }
            }}
          />
      )}
      <Pressable
       onPress={toggleDatepicker1}
      >
              <FormTextInput 
              placeholder= {date_1?.toDateString()}
              maxLength = {10}
              style={{width:160, textAlign: "left"}}
              onChangeText={props.handleChange("requesteddate_1")}
              placeholderTextColor= {placeColor}
              editable={false}
              >
            </FormTextInput>
      </Pressable>

   
      <View style={styles.timeContainer}>
        <Dropdown
          style={[styles.dropdownTime, isFocusTime && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyleTime}
          selectedTextStyle={styles.selectedTextStyleTime}
          data={times}
          search={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusTime ? 'Select a time' : '...'}
          value={props.values.time_1}
          onFocus={() => setIsFocusTime(true)}
          onBlur={() => setIsFocusTime(false)}
          onChange={item => {
            props.setFieldValue("time_1", item.value);
            setIsFocusTime(false);
          }}
        />
      </View>
      <Text style={{textAlign: 'center', color: 'red', width:160}}>{props.errors.requesteddate_1}</Text>
      <Text style={{textAlign: 'center', color: 'red', width:160}}>{props.errors.time_1}</Text>
      </CalendarContainer>
    <CalendarContainer>
      {showDate2 && (
          <DateTimePicker
            mode="date"
            display="default"
            value={date_2}
            onChange={({type}, selectedDate) => {
              if(type == "set"){
                setShowDate2(!showDate2);
                const currentDate = selectedDate ? selectedDate : new Date(); 
                setDate_2(currentDate); 
                setPlaceColor2("black"); 
                props.setFieldValue("requesteddate_2", currentDate.toDateString());
              }
              else{
                toggleDatepicker2(); 
              }
            }}
          />
      )}
      <Pressable
       onPress={toggleDatepicker2}
      >
              <FormTextInput 
              placeholder= {date_2?.toDateString()}
              maxLength = {10}
              style={{width:160, textAlign: "left"}}
              onChangeText={props.handleChange("requesteddate_2")}
              placeholderTextColor= {placeColor2}
              editable={false}
              >
            </FormTextInput>
      </Pressable>

      <View style={styles.timeContainer}>
        <Dropdown
          style={[styles.dropdownTime, isFocusTime2 && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyleTime}
          selectedTextStyle={styles.selectedTextStyleTime}
          data={times}
          search={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusTime2 ? 'Select a time' : '...'}
          value={props.values.time_2}
          onFocus={() => setIsFocusTime2(true)}
          onBlur={() => setIsFocusTime2(false)}
          onChange={item => {
            props.setFieldValue("time_2", item.value);
            setIsFocusTime2(false);
          }}
        />
      </View>
      <Text style={{textAlign: 'center', color: 'red', width:160}}>{props.errors.requesteddate_2}</Text>
      <Text style={{textAlign: 'center', color: 'red', width:160}}>{props.errors.time_2}</Text> 
      </CalendarContainer>
      <CalendarContainer>
      {showDate3 && (
          <DateTimePicker
            mode="date"
            display="default"
            value={date_3}
            onChange={({type}, selectedDate) => {
              if(type == "set"){
                setShowDate3(!showDate3);
                const currentDate = selectedDate ? selectedDate : new Date(); 
                setDate_3(currentDate); 
                setPlaceColor3("black"); 
                props.setFieldValue("requesteddate_3", currentDate.toDateString());
              }
              else{
                toggleDatepicker3(); 
              }
            }}
          />
      )}
      <Pressable
       onPress={toggleDatepicker3}
      >
              <FormTextInput 
              placeholder= {date_3?.toDateString()}
              maxLength = {10}
              style={{width:160, textAlign: "left"}}
              onChangeText={props.handleChange("requesteddate_3")}
              placeholderTextColor= {placeColor3}
              editable={false}
              >
            </FormTextInput>
      </Pressable>
      <View style={styles.timeContainer}>
        <Dropdown
          style={[styles.dropdownTime, isFocusTime3 && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyleTime}
          selectedTextStyle={styles.selectedTextStyleTime}
          data={times}
          search={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusTime3 ? 'Select a time' : '...'}
          value={props.values.time_3}
          onFocus={() => setIsFocusTime3(true)}
          onBlur={() => setIsFocusTime3(false)}
          onChange={item => {
            props.setFieldValue("time_3", item.value);
            setIsFocusTime3(false);
          }}
        />
      </View>
      <Text style={{textAlign: 'center', color: 'red', width:160}}>{props.errors.requesteddate_3}</Text>
      <Text style={{textAlign: 'center', color: 'red', width:160}}>{props.errors.time_3}</Text>
   
      </CalendarContainer>
      <BasicButton 
        onPress={() => props.handleSubmit()}
        btnStyles={{backgroundColor:colors.managePropBtn}}
        textStyles={{color: colors.white}}
        >
          Submit Request         
        </BasicButton>
      </KeyboardAwareScrollView>
    </BackgroundContainer>
   
      )}
        </Formik>
      
  );
};
export default SubmitRequest; 

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
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

  timeContainer: {
  },
  dropdownTime: {
    marginBottom: 5,
    height:43,
    width:160, 
    borderColor: colors.managePropBtn,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 8,
    opacity: 0.8,
    backgroundColor: colors.white, 
  },
  placeholderStyleTime: {
    fontSize: 13
  },
  selectedTextStyleTime: {
    fontSize: 13,
  },
});



