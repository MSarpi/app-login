import { View } from 'react-native'
import { Image } from '@rneui/themed'
import React from 'react'
import {styles} from "./registreScreen.styles"
import { RegisterForm } from "../../../components/Auth"
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"
export function registreScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image source={require("../../../../assets/img/logo-social.png")} style={styles.image}/>
      <View style={styles.content}>
        <RegisterForm/>
      </View>
    </KeyboardAwareScrollView> 

  )
}