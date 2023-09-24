import React, {FunctionComponent, useState, useEffect} from "react";
import { ImageBackground, Pressable, TextInput, TouchableOpacity, View} from "react-native";
import styled from "styled-components/native";
import background from "../../assets/mobilelandlord.png";  
import DateTimePicker from "@react-native-community/datetimepicker";

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
    const [date1, setDate1] = useState(new Date());
    const [showDate1, setShowDate1] = useState(false);
    const [requesteddate_1, setRequesteddate_1] = useState("");
    const [userId, setUserid] = useState(); 
    const [properties, setProperties] = useState([]); 

    const toggleDatepicker1 = () => {
        setShowDate1(!showDate1); 
      };
    
      const onChangeDate1 = ({type}: any, selectedDate: any) => {
          if(type == "set"){
            const currentDate = selectedDate; 
            setRequesteddate_1(currentDate); 
          }
          else{
            toggleDatepicker1(); 
          }
      };

    return (
        <BackGroundContainer source={background} resizeMode="stretch">

           {/* <BasicButton onPress={() => props.navigation.navigate('ManageProperties')}>
                Add Property
            </BasicButton> */}
        <GraphContainer>

        </GraphContainer>
        <View>
        {showDate1 && (
          <DateTimePicker
          mode="date"
          display="default"
          value={date1}
          onChange={onChangeDate1}
          />
        )}

             <Pressable
             onPress={toggleDatepicker1}
             >
               <TextInput 
                style={{width:300}}
                placeholder="Select a date"
                value={requesteddate_1}
                onChangeText={setRequesteddate_1}
                placeholderTextColor="#11182744"
                editable={false}
               />
             </Pressable>
       
    
      </View>
    </BackGroundContainer>
    );

};

export default ManageProperties; 