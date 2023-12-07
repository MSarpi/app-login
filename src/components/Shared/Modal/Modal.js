import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './ModalStyle'
import { Overlay } from '@rneui/base';
import Toast from 'react-native-toast-message';
export function Modal(props) {
    const {show, close, children} = props;
  return (
    <>
        <Overlay isVisible={show} overlayStyle={styles.overlay} onBackdropPress={close}>
       
       {children}
       <Toast/>
   </Overlay>
  
    </>

  )
}