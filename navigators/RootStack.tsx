import React, {FunctionComponent} from "react";
import Login from "./../screens/Login"
//nativation 
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandlordDashboard from "../screens/LandlordDashboard";
import ManageProperties from "./../screens/LandLordScreens/ManageProperties";
import Registration from "../screens/Registration"; 
import SubmitRequest from "../screens/SubmitRequest";
import AddProperty from "../screens/LandLordScreens/AddProperty";
import YTDExpenses from "../screens/LandLordScreens/YTDExpenses";
import IndividualExpense from "../screens/LandLordScreens/IndividualExpense";
import EditProperty from "../screens/LandLordScreens/EditProperty";
import PropertyDetails from "../screens/LandLordScreens/PropertyDetails";
import ManageTenants from "../screens/LandLordScreens/AddTenants";
import ViewTenants from "../screens/LandLordScreens/ViewTenants";
import AddTenants from "../screens/LandLordScreens/AddTenants";
import EditTenant from "../screens/LandLordScreens/EditTenant";
import ViewRequests from "../screens/ViewRequests";




export type RootstackParamList = {
 Login: undefined; 
 SubmitRequest: undefined; 
 LandlordDashboard: undefined; 
 Registration: undefined; 
 ManageProperties: undefined;
 ManageTenants: undefined; 
 AddProperty: undefined; 
 YTDExpenses: undefined;  
 IndividualExpense: undefined;
 PrpertyDetails: undefined; 
 ViewTenants: undefined; 
 ViewRequests: undefined; 
 AddTenants: undefined; 
 EditTenant: undefined; 
 RequestView:undefined; 
}; 

const Stack = createStackNavigator(); 

const Rootstack: FunctionComponent = () => {
    return <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                name="LandlordDashboard"
                component={LandlordDashboard}
                />
                 <Stack.Screen 
                name="ViewRequests"
                component={ViewRequests}
                />
                     <Stack.Screen 
                name="Registration"
                component={Registration}
                />         
                <Stack.Screen 
                name="SubmitRequest"
                component={SubmitRequest}
                />
                  <Stack.Screen 
                name="ManageProperties"
                component={ManageProperties}
                />
                 <Stack.Screen 
                name="ManageTenants"
                component={ManageTenants}
                />
                  <Stack.Screen 
                name="AddTenants"
                component={AddTenants}
                />
                    <Stack.Screen 
                name="EditTenant"
                component={EditTenant}
                />
                <Stack.Screen 
                name="ViewTenants"
                component={ViewTenants}
                />
                  <Stack.Screen 
                name="AddProperty"
                component={AddProperty}
                />
                     <Stack.Screen 
                name="EditProperty"
                component={EditProperty}
                />
                   <Stack.Screen 
                name="YTDExpenses"
                component={YTDExpenses}
                />
                         <Stack.Screen 
                name="PropertyDetails"
                component={PropertyDetails}
                />
                <Stack.Screen 
                name="IndividualExpense"
                component={IndividualExpense}
                />
          </Stack.Navigator>
      

    
    </NavigationContainer>
}
export default Rootstack