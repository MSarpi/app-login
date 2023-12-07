import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { screen } from "../utils"
import { LobbyScreen } from "../screen/Lobby/LobbyScreen"
// import { AddRestaurant } from "../screen/Restaurants/AddRestaurant"
const Stack = createNativeStackNavigator();

export default function LobbyStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen name={screen.lobby.lobby} component={LobbyScreen} options={{title: "Inicio"}}/>
        {/* <Stack.Screen name={screen.restaurant.addRestaurant} component={AddRestaurant} options={{title: "Nuevo Restaurante"}}/> */}
    </Stack.Navigator>
  )
}