import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Input, Button, Text } from '@rneui/base';
import { styles } from './FontPasswordStyle';
import Toast from 'react-native-toast-message';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './DontPasswordData';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export function DontPassword(props) {
  const { onClose } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        // El correo está registrado, enviar correo de restablecimiento de contraseña
        sendPasswordResetEmail(auth, formValue.email)
          .then(() => {
            onClose();
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Solicitud exitosa',
              text2: 'Revise su correo para restablecer la contraseña',
            });
          })
          .catch(function (e) {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Error al recuperar contraseña',
        });
      }
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>x</Text>
      </TouchableOpacity>

      <Text style={styles.tituloModal}>Recuperar contraseña </Text>
      <Input
        placeholder='Ingrese su correo'
        rightIcon={{
          type: 'material-community',
          name: 'at',
          color: '#c2c2c2',
        }}
        onChangeText={(text) => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
      />

      <Button buttonStyle={styles.btn} title='Recuperar contraseña' onPress={formik.handleSubmit} loading={formik.isSubmitting} />
    </View>
  );
}
