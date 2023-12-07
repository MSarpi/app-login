import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { AccountScreen } from '../screen/Account/AccountScreen'
import { LoginScreen } from "../screen/Account/LoginScreen"
import { registreScreen } from "../screen/Account/registreScreen/registreScreen"
import { screen } from "../utils"
const Stack = createNativeStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator> 
        <Stack.Screen name={screen.account.account} component={AccountScreen} options={{title: "Cuenta"}}/>

        <Stack.Screen name={screen.account.login} component={LoginScreen} options={{title: "Iniciar Sesion"}}/>

        <Stack.Screen name={screen.account.register} component={registreScreen} options={{title: "Crea tu cuenta"}}/>
    </Stack.Navigator>
    
  )
} 