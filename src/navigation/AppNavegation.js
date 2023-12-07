import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';

import LobbyStack from "./LobbyStack";
import AccountStack from '../navigation/AccountStack';
import { screen } from "../utils"; 



const Tab = createBottomTabNavigator();
 
export function AppNavigation() { 
  return (
    <Tab.Navigator  screenOptions={({route}) => ({
        tabBarActiveTintColor: "#00a680",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({color, size}) => screenOption(route, color, size),
        headerShown: false
    })}> 
      <Tab.Screen name={screen.lobby.tab} component={LobbyStack} options={{ title: "Inicio"}}/>

      <Tab.Screen name={screen.account.tab} component={AccountStack} options={{ title: "Cuenta"}}/> 
    </Tab.Navigator>
  );
}

function screenOption( route, color, size ) {
    let iconName;

    if (route.name === screen.lobby.tab) {
        iconName = "compass-outline"
    }

    if (route.name === screen.account.tab) {
        iconName = "home-outline"
    }

    return (
        <Icon type='material-community' name={iconName} color={color} size={size}/>
    )
}