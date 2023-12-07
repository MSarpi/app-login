
import { LogBox } from "react-native"
import { AppNavigation } from './src/navigation/AppNavegation'
import { NavigationContainer } from '@react-navigation/native'
import { initfirebase } from "./src/utils"
import Toast from "react-native-toast-message"
LogBox.ignoreAllLogs();
export default function App() {
  return (
      <>
      <NavigationContainer>
        <AppNavigation/>
      </NavigationContainer>
      <Toast/>
      </>
  );
} 