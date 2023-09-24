import React, {FunctionComponent, useState, useEffect} from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Container } from "../components/shared"; 
import BasicButton from "../components/Buttons/BasicButton";
import {colors} from "../components/colors"; 
import { ImageBackground, Button } from "react-native";
import axios, { AxiosResponse } from "axios";
import styled from "styled-components/native";
import { useRoute } from "@react-navigation/native";
import StyledTextInput from "../components/Inputs/StyledTextInput"; 


import background from "./../assets/mobilelandlord.png";
import { ScrollView } from "react-native-gesture-handler";

const LandlordDashContainer= styled(Container)`
background-color: ${colors.white};
width:100%;
height:100%; 
`;

const GraphContainer = styled.View`
background-color: pink; 
width: 100%;
flex:1; 
max-height: 40%; 
`;

const ContentContainer = styled.View`
width: 100%;
flex:1; 
`;

interface DashboardProps{
    navigation : any;
}


const LandlordDashboard = (props:DashboardProps) => {
    let route: RouteProp<{params: {id: string}}, 'params'> = useRoute();
    const id = route.params?.id; 
    const isLandlord = true; 
    return (
        <LandlordDashContainer>

            <GraphContainer>
                   
            </GraphContainer>
        
            <ContentContainer>
                <ScrollView>
                <BasicButton  onPress={() => props.navigation.navigate('ManageProperties', {id: id})}
                btnStyles={{backgroundColor: colors.managePropBtn }}
                textStyles={{color: colors.white}}
                >Manage Properties</BasicButton>
                <BasicButton  onPress={() => props.navigation.navigate('ViewRequests', {id: id})}
                btnStyles={{backgroundColor: colors.viewRequestsBtn }}
                textStyles={{color: colors.white}}
                >View Requests</BasicButton>
                <BasicButton  onPress={() => props.navigation.navigate('ViewTenants', {id: id})}
                btnStyles={{backgroundColor: colors.manageProvidersBtn}}
                textStyles={{color: colors.white}}
                >Manage Tenants</BasicButton>
                <BasicButton  onPress={() => props.navigation.navigate('ManageProviders', {id: id})}
                btnStyles={{backgroundColor: colors.manageProvidersBtn}}
                textStyles={{color: colors.white}}
                >Manage Providers</BasicButton>
                  <BasicButton  onPress={() => props.navigation.navigate("SubmitRequest", {id: id})}
                btnStyles={{backgroundColor: colors.submitBtnLand}}
                textStyles={{color: colors.white}}
                >Submit Request</BasicButton>
                </ScrollView>
            </ContentContainer>
        </LandlordDashContainer>
    );

};

export default LandlordDashboard; 