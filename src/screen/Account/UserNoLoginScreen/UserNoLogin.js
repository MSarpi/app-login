import { View, ScrollView } from 'react-native'
import React from 'react'
import {Text, Button, Image } from '@rneui/base'
import { styles } from "./UserNoLoginStyle"
import ImgUserNoLogin from "../../../../assets/img/user-guest.png"
import { useNavigation } from "@react-navigation/native"
import {screen} from "../../../utils"

export default function UserNoLogin() {
  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate(screen.account.login)
  }
  return (
    <ScrollView style={styles.viewBody}>
      <Image source={ImgUserNoLogin} style={styles.imgnologin}/>
      <Text style={styles.tittlenologin}>
        Consultar Peril
      </Text>
      <Text style={styles.descripcionnologin}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at nulla eget ipsum pulvinar auctor. Nullam sollicitudin nisi vitae sem convallis, eget rhoncus augue malesuada. Pellentesque suscipit quis nulla vitae congue. Donec eget sodales quam. Nunc imperdiet mi elit, sed lacinia est tempor eu.</Text>
      <Button title="Ver Perfil" onPress={goToLogin} buttonStyle={styles.btnnologin}>
      </Button>
    </ScrollView>
  )
}