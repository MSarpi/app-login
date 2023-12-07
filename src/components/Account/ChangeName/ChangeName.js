import { AppState, View } from 'react-native'
import React from 'react' 
import { Input, Button, Text } from '@rneui/base'
import { styles } from './ChangeNameStyle'
import { useFormik } from "formik"
import { initialValues, validationSchema} from "./ChangeNameData"
import Toast from "react-native-toast-message"
import {getAuth, updateProfile} from "firebase/auth"

export function ChangeName(props) {
  const { onClose, onReload } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(), 
    validateOnChange: false,
    onSubmit: async(formValue) => {
      try {
        const { displayName } = formValue;
        const currentUser = getAuth().currentUser;
        await updateProfile(currentUser, {displayName})

        onReload();
        onClose();
         
      } catch (error) {

        Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2: "Error al cambiar el usuario"
        })
      }
    }
  })
  return (
    <View style={styles.content}>
      <Text style={styles.titulomodal}>Cambiar nombre de Usuario</Text>
      <Input
        placeholder='Nuevo nombre de usuario' 
        rightIcon={{ 
                    type: "material-community", 
                    name: "account-circle-outline", 
                    color: "#c2c2c2"}}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}/>
        
      <Button  containerStyle={styles.containerBtn}
        title="Actualizar" 
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
        />
    </View>
  )
}