import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { InfoUser, AccountOption } from "../../../components/Account";
import { styles } from './UserLoginStyle';
import { Button } from '@rneui/themed';
import { getAuth, signOut, sendEmailVerification } from "firebase/auth";
import { LoadingModal } from '../../../components';

export default function UserLogin() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [_, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

  const goToOutLogin = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View style={styles.content}>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />
      <AccountOption onReloadAccoun={onReload} />
      <Button title="Cerrar Sesión" buttonStyle={styles.btn} onPress={goToOutLogin} />
      <LoadingModal show={loading} text={loadingText} />
      <Text style={styles.verificada}>Cuenta Verificada</Text>
    </View>
  );
}
