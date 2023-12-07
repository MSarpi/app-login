import React, {useState} from 'react';

import { 
  getAuth, 
  updateEmail, 
  reauthenticateWithCredential, 
  EmailAuthProvider
} from "firebase/auth";

import { View } from 'react-native';
import { Input, Button } from '@rneui/base';
import { styles } from './ChangeEmailStyle';
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeEmailData";
import Toast from 'react-native-toast-message';

export  function ChangeEmail( props) {

  const { onClose, onReload } = props;
  const [showpassword, setShowpassword] = useState(false);

  const showPasswordOption = () => setShowpassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = getAuth().currentUser;
        const credentials = EmailAuthProvider.credential(
          currentUser.email,
          formValue.displayPassword
        );
        reauthenticateWithCredential(currentUser, credentials);

        await updateEmail(currentUser, formValue.displayEmail);
        onReload();
        onClose();
      } catch (error) {
        console.log(error)
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar el email",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
        <Input
        onChangeText={(text) => formik.setFieldValue('displayEmail', text)}
        errorMessage={formik.errors.displayEmail}
        placeholder='Ingrese su correo actual' 
        rightIcon={{ 
                    type: "material-community", 
                    name: "at", 
                    color: "#c2c2c2"}}/> 
        <Input
        onChangeText={(text) => formik.setFieldValue('displayPassword', text)}
        errorMessage={formik.errors.displayPassword}
        secureTextEntry={showpassword ? false : true}
        placeholder='Ingrese su contraseña' 
        rightIcon={{ 
                    type: "material-community", 
                    name: showpassword ? 'eye-outline' : 'eye-off-outline', 
                    color: "#c2c2c2",
                    onPress: showPasswordOption}}           
        />

      <Button  containerStyle={styles.containerBtn}
        title="Actualizar"
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting} 
        />
    </View>
  )
}