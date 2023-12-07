import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import {Overlay} from "@rneui/themed"
import { styles } from "./LoadingModal.styles"

export  function LoadingModal(props) {
  const { show, text} = props 
  return (
    <Overlay isVisible={show} windowBackgroundColor="rgba(0,0,0, 0.5)" overlayBackgroudColor="transparent" overlayStyle={styles.overlay}>
      <View viewStyle={styles.view}>
        <ActivityIndicator size="large" color="#00a680"/>
        {text && <Text textStyle={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  )
}

LoadingModal.defaultProps = {
  show: false
}