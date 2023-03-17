import React, { useEffect, useState } from 'react'
import { Image, ActivityIndicator, View, Text, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
import { CustomTextInput } from '../../components/CustomTextInput';
import { RoundedButton } from '../../components/RoundedButton';
import useViewModel from './ViewModel';
import styles from './Styles';
import { ModalPickImage } from '../../components/ModalPickImage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { MyColors } from '../../theme/AppTheme';

// Declaramos las propiedades de navegación que recibirá el componente
interface Props extends StackScreenProps<RootStackParamList, 'RegisterScreen'>{};

// Componente funcional de la pantalla de registro
export const RegisterScreen = ({navigation, route}: Props) => {

 // Uso del hook useViewModel
  const { name, lastname, email, image, phone, password, confirmPassword, loading, errorMessage, user, onChange, register, pickImage, takePhoto } = useViewModel();
 
   // useEffect para mostrar errores en un ToastAndroid
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect para redireccionar al usuario a la pantalla de ClientTabsNavigator cuando se registre
  useEffect(() => {
    if (errorMessage != '') {
      ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }
  }, [errorMessage])

   // Redirigimos al usuario a la pantalla de inicio si ya inició sesión
  useEffect(() => {      
    if (user?.id !== null && user?.id !== undefined) {
        navigation.replace('ClientTabsNavigator');
    }
  }, [user])
  
 // Renderizado del componente RegisterScreen
  return (
    // COLUMN
      // Columna principal
    <View style={styles.container}>

          {/* Imagen de fondo*/}
        <Image
          source={ require('../../../../assets/chef.jpg') } 
          style={ styles.imageBackground }
          />
            {/*Contenedor de imagen de perfil*/ }
        <View style={ styles.logoContainer }>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            {
              image == ''
              ? <Image 
                  source={ require('../../../../assets/user_image.png') }
                  style={ styles.logoImage }
              />
              : <Image 
                  source={{ uri: image }}
                  style={ styles.logoImage }
                />
            }
            
          </TouchableOpacity>

          <Text style={ styles.logoText }>SELECCIONA UNA IMAGEN</Text>
        </View>
            {/*Contenedor de imagen de formulario de registro*/ }
        <View style={ styles.form }>

          <ScrollView>

            <Text style={ styles.formText }>REGISTRARSE</Text>

            {/*Contenedor de formulario de nombre*/ }
            <CustomTextInput 
              placeholder='Nombres'
              keyboardType='default'
              image={ require('../../../../assets/user.png') }
              property='name'
              onChangeText={ onChange }
              value={ name }
              />

            {/*Contenedor de formulario de Apelliddos*/ }
            <CustomTextInput 
              placeholder='Apellidos'
              keyboardType='default'
              image={ require('../../../../assets/my_user.png') }
              property='lastname'
              onChangeText={ onChange }
              value={ lastname }
              />
            
            {/*Contenedor de formulario de correo*/ }
            <CustomTextInput 
              placeholder='Correo electronico'
              keyboardType='email-address'
              image={ require('../../../../assets/email.png') }
              property='email'
              onChangeText={ onChange }
              value={ email }
              />

            {/*Contenedor de formulario de correo*/ }
            <CustomTextInput 
              placeholder='Telefono'
              keyboardType='numeric'
              image={ require('../../../../assets/phone.png') }
              property='phone'
              onChangeText={ onChange }
              value={ phone }
              />
            
            {/*Contenedor de formulario de contraseña */ }
            <CustomTextInput 
              placeholder='Contraseña'
              keyboardType='default'
              image={ require('../../../../assets/password.png') }
              property='password'
              onChangeText={ onChange }
              value={ password }
              secureTextEntry={ true }
              />
            
            {/*Contenedor de formulario de contraseña*/ }
            <CustomTextInput 
              placeholder='Confirmar Contraseña'
              keyboardType='default'
              image={ require('../../../../assets/confirm_password.png') }
              property='confirmPassword'
              onChangeText={ onChange }
              value={ confirmPassword }
              secureTextEntry={ true }
              />

            <View style={{ marginTop: 30 }}>
                
                <RoundedButton text='CONFIRMAR' onPress={ () => register()} />

            </View>

          </ScrollView>

        </View>
        

        <ModalPickImage
          openGallery={ pickImage }
          openCamera={ takePhoto }
          modalUseState={ modalVisible }
          setModalUseState={ setModalVisible }
          />

        {
          loading && 
          <ActivityIndicator 
            style={styles.loading} 
            size="large" 
            color={ MyColors.primary }  
          />
        }
        

    </View>
    );
}
    
// HOT RELOAD


    
