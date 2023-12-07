import { View } from 'react-native'
import React, { useState } from 'react'
import { Input, Icon, Button } from '@rneui/themed'
import { styles } from "./LoginFormStyle"
import { initialValues, validationSchema } from './LoginFormData'
import { getAuth, signInWithEmailAndPassword} from "firebase/auth" //Inicia sesion
import {useNavigation } from "@react-navigation/native"
import { useFormik } from 'formik';
import {screen} from "../../../utils"
import Toast from "react-native-toast-message"

export  function LoginForm() {
    const [showpassword, setShowpassword] = useState(false);
    const showPasswordOption = () => setShowpassword((prevState) => !prevState);

    const navigation = useNavigation();
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async(formValue) => {
            try {
                const auth = getAuth();
                const user = await signInWithEmailAndPassword(
                    auth,
                    formValue.email,
                    formValue.password
                )
                if ( user.user.emailVerified === false){
                    Toast.show({
                        type: "error",
                        position: "top",
                        text1: "Cuenta no Verificada",
                        text2: "Verifica la cuenta de tu correo electronico"
                    })
                }else{
                    Toast.show({
                        type: "success",
                        position: "top",
                        text1: "Bienvenido",
                    })
                    navigation.navigate(screen.account.account)
                }
                // console.log(user.user.emailVerified)
                // 
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "top",
                    text1: "Error",
                    text2: "Correo o Contraseña incorrectos"
                })
            }
        },
      });
    return (
        <View style={styles.container}>
            <Input 
                onChangeText={(text) => formik.setFieldValue('email', text)}
                errorMessage={formik.errors.email}
                placeholder='Correo Electronico' 
                containerStyle={styles.input} 
                rightIcon={<Icon 
                            type='material-community' 
                            name='at' 
                            style={styles.icono}/>}
            />

            <Input 
                onChangeText={(text) => formik.setFieldValue('password', text)}
                errorMessage={formik.errors.password}
                placeholder='Contraseña' 
                secureTextEntry={!showpassword}
                rightIcon={<Icon 
                            type='material-community' 
                            name={showpassword ? 'eye-outline' : 'eye-off-outline' }  
                            onPress={showPasswordOption}
                            style={styles.icono}/>}
            />

            <Button onPress={formik.handleSubmit}  buttonStyle={styles.btn} title="Iniciar Sesión" loading={formik.isSubmitting}/>  
            
        </View>
    )
}