import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Icon, Button, Text } from '@rneui/base';
import { styles } from './RegisterFormStyle';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './RegistertFormData';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils';
import Toast from 'react-native-toast-message';

export function RegisterForm() {
  const [showpassword, setShowpassword] = useState(false);
  const [reShowpassword, setReShowpassword] = useState(false);
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );

        // Update user profile with displayName
        await updateProfile(userCredential.user, {
          displayName: formValue.user,
        });

        // Send email verification
        const user = userCredential.user;

        await sendEmailVerification(user);

        await signOut(auth);

        navigation.navigate(screen.account.login);

        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Registro Exitoso:',
          text2: 'Verifica tu cuenta en el correo',
        });

      } catch (error) {
        if (error.code === 'auth/weak-password') {
          // Handle weak password error
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Contraseña:',
            text2: 'Mínimo necesita 6 Caracteres',
          });
        } else if (error.code === 'auth/email-already-in-use') {
          // Handle email already in use error
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Correo Electrónico:',
            text2: 'Ya está en uso. Por favor, elige otro correo electrónico.',
          });
        } else {
          // Handle other types of errors
          console.error('FirebaseError:', error);
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Error:',
            text2: 'Hubo un problema durante el registro. Por favor, inténtalo de nuevo.',
          });
        }
      }
    },
  });

  const showPasswordOption = () => setShowpassword((prevState) => !prevState);
  const showRePasswordOption = () => setReShowpassword((prevState) => !prevState);

  return (
    <View style={styles.content}>
      <Input
        placeholder='Nombre de Usuario'
        containerStyle={styles.input}
        rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon} />}
        onChangeText={(text) => formik.setFieldValue('user', text)}
        errorMessage={formik.errors.user}
      />

      <Input
        placeholder='Correo Electronico'
        containerStyle={styles.input}
        rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon} />}
        onChangeText={(text) => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
      />

      <Input
        placeholder='Contraseña'
        secureTextEntry={!showpassword}
        containerStyle={styles.input}
        rightIcon={<Icon type='material-community' name={showpassword ? 'eye-off-outline' : 'eye-outline'} iconStyle={styles.icon} onPress={showPasswordOption}/>}
        onChangeText={(text) => formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password}
      />

      <Input
        placeholder='Confirm Contraseña'
        secureTextEntry={!reShowpassword}
        containerStyle={styles.input}
        rightIcon={<Icon type='material-community' name={reShowpassword ? 'eye-off-outline' : 'eye-outline'} iconStyle={styles.icon} onPress={showRePasswordOption}/>}
        onChangeText={(text) => formik.setFieldValue('repassword', text)}
        errorMessage={formik.errors.repassword}
      />

      <Button onPress={formik.handleSubmit} 
      title='Registrarse' 
      containerStyle={styles.btncontainer} 
      buttonStyle={styles.btn} 
      loading={formik.isSubmitting}/>
    </View>
  );
}
