import { View, ScrollView } from 'react-native'
import React, {useState} from 'react'
import {Text, Image} from "@rneui/themed"
import { styles } from './LoginScreenStyle'
import { useNavigation } from "@react-navigation/native"
import { screen } from "../../../utils"
import { LoginForm } from "../../../components/Auth/LoginForm/LoginForm"
import { Modal } from "../../../components/Shared"
import { DontPassword } from "../../../components/Auth/DontPassword"
export function LoginScreen() {

  const [showModal, setShowModal] = useState(false); 
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);
  
  const [ renderComponent, setRenderComponent ] = useState(null)

  const navigation = useNavigation();
 
  const goToRegister = () => {
    navigation.navigate(screen.account.register)
  }
  return (
    <ScrollView>
      <Image source={require("../../../../assets/img/logo-social.png")} 
      style={styles.image}/>
      <View style={styles.content}>
        <LoginForm/>
        <Text style={styles.dontPassword}>
          ¿Olvidaste tú contraseña? 
          <Text style={styles.here} onPress={onCloseOpenModal}> Pincha aquí </Text>
        </Text>
        <Text style={styles.nocount}>
          ¿Aun no tienes una cuenta?
        </Text>
        <Text onPress={goToRegister} style={styles.register}>
          Registrate aquí
        </Text>
      </View>
      <Modal show={showModal} >
        <DontPassword onClose={onCloseOpenModal}/>
      </Modal>
    </ScrollView>
  )
}