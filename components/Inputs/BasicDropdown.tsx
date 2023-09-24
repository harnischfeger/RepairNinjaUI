import React, {FunctionComponent, useState} from "react";
import {colors} from "../colors"; 
import {StyleSheet, View, Text, TextInput} from "react-native";
import styled from "styled-components/native";
import { Dropdown } from 'react-native-element-dropdown';

const BackgroundContainer = styled.ImageBackground`
width:100%;
height: 100%;
`;

const BasicDropdown: FunctionComponent = () => {

    return (   
  
      <View style={styles.container}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          search    
          maxHeight={300}
          labelField="label"
          valueField="value"
          searchPlaceholder="Search..." 
          placeholder=""
          data={[]} 
          onChange={function (item: { label: any; } & { value: any; }): void {
            throw new Error("Function not implemented.");
          } }        
          />
      </View>      
  );
};
export default BasicDropdown; 

const styles = StyleSheet.create({
    container: {
      marginTop: 20, 
      justifyContent: 'center',
      alignItems: 'center', 
    },
    dropdown: {
      height: 60,
      width:300, 
      borderColor: colors.managePropBtn,
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 8,
      backgroundColor: colors.white, 
    },
    placeholderStyle: {
      fontSize: 16
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });