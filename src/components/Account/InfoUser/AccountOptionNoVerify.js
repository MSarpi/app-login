import React, {useState} from 'react';
import { View } from 'react-native';
import { ListItem, Icon, Text } from '@rneui/themed';
import { map } from 'lodash';
import { styles } from './InfoUserStyle';
import { Modal } from "../../../components/Shared"
import { ChangeName } from "../ChangeName"
import { ChangeEmail } from "../ChangeEmail"
import { ChangePassword } from "../ChangePassword" 
 
export function AccountOptionNoVerify(props) { 

  const { onReloadAccoun } = props;
  const [showModal, setShowModal] = useState(false); 
  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  const [ renderComponent, setRenderComponent ] = useState(null)
  
  const selecterComponent = (key) => {
    if(key === "DisplayName"){
      setRenderComponent(
        <ChangeName onClose={onCloseOpenModal} onReload={onReloadAccoun}/>
      )
    }
    onCloseOpenModal();
    
  } 

 

  const menuOption = getMenuOption(selecterComponent);
  return (
    <View>
      {map(menuOption, (menu, index) => (
        <ListItem key={index} style={styles.list} onPress={menu.onPress}>
          <Icon type={menu.iconType} name={menu.iconNameLeft} color={menu.iconColorLeft} />
          <ListItem.Content style={styles.listItemContent}>
            <ListItem.Title>{menu.tittle}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content right>
            <Icon type={menu.iconType} name={menu.iconNameRight} color={menu.iconColorRight} />
          </ListItem.Content>
        </ListItem>
      ))}
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderComponent}
      </Modal>
    </View> 
  );
}

function getMenuOption(selecterComponent) {
  return [
    {
      tittle: 'Cambiar nombre de usuario',
      iconType: 'material-community',
      iconNameLeft: 'account-circle',
      iconColorLeft: '#ccc',
      iconNameRight: 'chevron-right',
      iconColorRight: '#ccc',
      onPress: () => selecterComponent("DisplayName"),
    }
  ];
}
