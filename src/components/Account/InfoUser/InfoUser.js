import React, {useState} from 'react'
import { View } from 'react-native'
import { Avatar, Text } from '@rneui/base' 
import { getAuth, updateProfile } from "firebase/auth"
import { styles } from './InfoUserStyle'
import * as ImagePicker from "expo-image-picker"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"


export function InfoUser(props) {
    const { setLoading, setLoadingText } = props;
    
    const { uid, photoURL, displayName, email } = getAuth().currentUser;

    const [avatar, setAvatar] = useState(photoURL);

    const getUrlAvatar = async () => {
       const result = await  ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect:[4, 3]
       })
       if (!result.canceled) uploadImage(result.uri)
    }

    const uploadImage = async (uri) => {
      setLoadingText("Actualizando Avatar");
      setLoading(true);

      try {
          const response = await fetch(uri);
          const blob = await response.blob();

          const storage = getStorage();
          const storageRef = ref(storage, `avatar/${uid}`);

          const snapshot = await uploadBytes(storageRef, blob);

          await updatePhotoUrl(snapshot.metadata.fullPath);
      } catch (error) {
          console.error("Error al subir la imagen:", error);
          setLoading(false);
      }
  };

  const updatePhotoUrl = async (imagePath) => {
      try {
          const storage = getStorage();
          const imageRef = ref(storage, imagePath);
          const imageUrl = await getDownloadURL(imageRef);

          const auth = getAuth();
          await updateProfile(auth.currentUser, { photoURL: imageUrl });

          setAvatar(imageUrl);
          setLoading(false);
      } catch (error) {
          console.error("Error al actualizar la URL de la foto:", error);
          setLoading(false);
      }
  };
  return (
    <View style={styles.content}>
      <Avatar 
        size="large" 
        rounded 
        containerStyle={styles.avatar}
        icon={{type: "material", name: "person"}}
        source={photoURL ? { uri: avatar } : null}>
        <Avatar.Accessory size={24} onPress={getUrlAvatar}/>
      </Avatar>
      <View style={styles.viewDisplay}>
        <Text style={styles.displayname}> 
            { displayName || `UserName` }
        </Text>
        <Text>
            {email}
        </Text>
      </View>
    </View>
  )
}