import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@rneui/themed';
import { screen } from "../../utils"

export function LobbyScreen(props) {
  const { navigation } = props;

  // const goToRestaurant = () => {
  //   navigation.navigate(screen.restaurant.addRestaurant)
  // }
  return (
    <View>
      <Text>Lobby inicio</Text>
      {/* <Button title="crear restaurant" onPress={goToRestaurant}></Button> */}
      {/* Otro contenido de la pantalla de restaurante */}
    </View>
  );
}