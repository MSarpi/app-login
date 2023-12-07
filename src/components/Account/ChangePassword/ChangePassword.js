import { View } from 'react-native'
import React, {useState} from 'react' 
import { Input, Button, Text } from '@rneui/base'
import { styles } from './ChangePasswordStyle'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from "./ChangePasswordData"
import { getAuth, updatePassword, signOut, EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth"

import Toast from 'react-native-toast-message'

export function ChangePassword(props) {
  const { onClose } = props;
  const [showPassword, setShowpassword] = useState(false);
  const showPasswordOption = () => setShowpassword((prevState) => !prevState);

  const [showNewPassword, setNewShowpassword] = useState(false);
  const showNewPasswordOption = () => setNewShowpassword((prevState) => !prevState);

  const [showReNewPassword, setReNewShowpassword] = useState(false);
  const showReNewPasswordOption = () => setReNewShowpassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(), 
    validateOnChange: false,
    onSubmit: async(formValue) => {
      try {
        const auth = getAuth();
        const currentUser = getAuth().currentUser;
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          formValue.oldPassword
        );
        await new Promise((resolve, reject) => {
          reauthenticateWithCredential(currentUser, credential)
            .then(resolve)
            .catch(reject);
        });

        await updatePassword(currentUser, formValue.newPassword);
        await signOut(auth);
        onClose();
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Cambio de clave exitoso:',
          text2: 'Re-inicia sesion',
        });
      } catch (error) {
        console.log(error)
        if (error.code === 'auth/invalid-credential') {
          // Handle weak password error
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Contraseña:',
            text2: 'Contraseña actual incorrecta',
          });
        }else{
          Toast.show({
            type: "error",
            position: "top",
            text1: "error"
          })
        }

      }
    }
  })

  return (
      <View style={styles.content}>
          <Text style={styles.titulomodal}>Cambiar contraseña</Text> 

          <Input
          secureTextEntry={showPassword ? false : true}
          placeholder='Ingrese su contraseña Actual' 
          rightIcon={{ 
              type: "material-community", 
              name: showPassword ? 'eye-outline' : 'eye-off-outline', 
              color: "#c2c2c2",
              onPress: showPasswordOption}} 
          onChangeText={(text) => formik.setFieldValue("oldPassword", text)}
          errorMessage={formik.errors.oldPassword}/>

          <Input
          secureTextEntry={showNewPassword ? false : true}
          placeholder='Ingrese su contraseña nueva' 
          rightIcon={{ 
              type: "material-community", 
              name: showNewPassword ? 'eye-outline' : 'eye-off-outline', 
              color: "#c2c2c2",
              onPress: showNewPasswordOption}} 
          onChangeText={(text) => formik.setFieldValue("newPassword", text)}
          errorMessage={formik.errors.newPassword}/>
  
         <Input
          secureTextEntry={showReNewPassword ? false : true}
          placeholder='Ingrese su contraseña nueva' 
          rightIcon={{ 
              type: "material-community", 
              name: showReNewPassword ? 'eye-outline' : 'eye-off-outline', 
              color: "#c2c2c2",
              onPress: showReNewPasswordOption}} 
          onChangeText={(text) => formik.setFieldValue("newRePassword", text)}
          errorMessage={formik.errors.newRePassword}/>

        <Button  containerStyle={styles.containerBtn} onPress={formik.handleSubmit} loading={formik.isSubmitting}
          title="Actualizar" 
          />
      </View>
    )
}