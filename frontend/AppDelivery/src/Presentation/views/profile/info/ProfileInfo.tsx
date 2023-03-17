import { StackScreenProps, StackNavigationProp  } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { View, Text, Button, Image, Pressable } from 'react-native'
import { RootStackParamList } from '../../../../../App';
import useViewModel from './ViewModel';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../../components/RoundedButton';
import { TouchableOpacity } from 'react-native-gesture-handler';



// ProfileInfoScreen component
export const ProfileInfoScreen = () => {


  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
   // Get removeSession function from ViewModel using custom hook useViewModel
  const { user, removeUserSession} = useViewModel();

  useEffect(() => {
    if (user.id === ''){
      navigation.replace('HomeScreen');
    }

  }, [user])

  return (
    <View style={ styles.container}>
       <Image
        source={ require('../../../../../assets/city.jpg') } 
        style={ styles.imageBackground }
        />

      <Pressable 
      style={ styles.logOut}
      onPress={() =>{
        removeUserSession();

       }} >
      <Image
              source={ require('../../../../../assets/cerrar-sesion.png') } 
              style={ styles.logOutImage }
              />
      </Pressable>
        
        <View style={ styles.logoContainer }>
          { 
            user?.image !== ''
             &&
              <Image 
                /** Mandamos a llamar la imagen del usuario **/ 
                 source={{uri: user?.image} }
                  style={ styles.logoImage }
             />
        }
            

        </View>

        <View style={ styles.form }>
            <View style={styles.formInfo }>
               <Image
                source={require('../../../../../assets/user.png')}
                style={ styles.formImage}
               /> 
              <View style= {styles.formContent}>
                <Text>{user?.name} {user?.lastname}</Text>
                <Text style={styles.formTextDescription}>Nombre del Usuario</Text>
              </View>
            </View>

            <View style={{...styles.formInfo, marginTop: 25} }>
               <Image
                source={require('../../../../../assets/email.png')}
                style={ styles.formImage}
               /> 
              <View style= {styles.formContent}>
                <Text>{user?.email}</Text>
                <Text style={styles.formTextDescription}>Correo del Usuario</Text>
              </View>
            </View>

            <View style={{...styles.formInfo, marginTop: 25, marginBottom: 70} }>
               <Image
                source={require('../../../../../assets/phone.png')}
                style={ styles.formImage}
               /> 
              <View style= {styles.formContent}>
                <Text>{user?.phone}</Text>
                <Text style={styles.formTextDescription}>Telefono del Usuario</Text>
              </View>
            </View>
        
          <RoundedButton 

          //Este metodo nos permite navegar al prescionar el boton a la pantalla definida
            onPress={() => {
              navigation.navigate('ProfileUpdateScreen', {user: user!})
            }}
            text = 'Actualizar informacion'
          />
        
        
        
        </View>
    </View>
  )
}
