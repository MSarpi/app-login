import React, {useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import UserLogin from "./UserLoginScreen/UserLogin"
import UserNoLogin from "./UserNoLoginScreen/UserNoLogin"
import { LoadingModal } from "../../components"

export function AccountScreen() {
  const [hasLogged, sethasLogged] = useState(null)

  useEffect(() => {
    const auth = getAuth ();
    onAuthStateChanged(auth, (user) => {
      sethasLogged(user ? true : false)
    })
  }, [])
  
  if (hasLogged === null) {
    return <LoadingModal show text="Cargando"/>
  } 
  return hasLogged ? <UserLogin/> : <UserNoLogin/>;
}