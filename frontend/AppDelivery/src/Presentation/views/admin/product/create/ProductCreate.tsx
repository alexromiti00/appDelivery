 import React, { useEffect, useState } from 'react'
 import { View, Text, Image, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { CustomTextInput } from '../../../../components/CustomTextInput';
import { ModalPickImage } from '../../../../components/ModalPickImage';
import { RoundedButton } from '../../../../components/RoundedButton';
import { MyColors, MyStyles } from '../../../../theme/AppTheme';
 import styles from './Styles';
 import useViewModel from './ViewModel';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator';
import { ModalPickMultipleImage } from '../../../../components/ModalPickMultipleImage copy';
 

interface Props extends StackScreenProps<ProductStackParamList, 'AdminProductCreateScreen'>{};//Aqui hereda las caracteristicas

export const AdminProductCreateScreen = ({navigation, route}: Props) => {

  const { category } = route.params;
  const { name, description, image1, image2, image3, onChange, responseMessage, idCategory, price, takePhoto, pickImage, loading, createProduct} = useViewModel(category);
  const [modalVisible, setModalVisible] = useState(false);
  const [numberImage, setnumberImage] = useState(1);
  

  useEffect(() => {
    if (responseMessage !='') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
    
  }, [responseMessage])


  return (
   <View style={styles.container}>

    <View style={styles.imageContainer} >

    <TouchableOpacity 

      onPress= {() => {
        setnumberImage(1)
        setModalVisible(true)
      }}//Muestra para mostar opcion de camara o garelia
      >
            {
              image1 == ''
              ? <Image
              style={styles.image}
              source={ require('../../../../../../assets/image_new.png')}
          />
              : <Image 
                  source={{ uri: image1 }}
                  style={ styles.image }
                />
            }

      </TouchableOpacity>

      <TouchableOpacity 

      onPress= {() => {
        setnumberImage(2)
        setModalVisible(true)
      }}//Muestra para mostar opcion de camara o garelia
      >
            {
              image2 == ''
              ? <Image
              style={styles.image}
              source={ require('../../../../../../assets/image_new.png')}
          />
              : <Image 
                  source={{ uri: image2 }}
                  style={ styles.image }
                />
            }

      </TouchableOpacity>

       <TouchableOpacity 

      onPress= {() => {
        setnumberImage(3)
        setModalVisible(true)
      }}//Muestra para mostar opcion de camara o garelia
      >
            {
              image3 == ''
              ? <Image
              style={styles.image}
              source={ require('../../../../../../assets/image_new.png')}
          />
              : <Image 
                  source={{ uri: image3 }}
                  style={ styles.image }
                />
            }

      </TouchableOpacity>
      
    </View>

      <View style={styles.form}>

      <View style={styles.categoryInfo}>

        <Image
          style={styles.imageCategory}
          source={require('../../../../../../assets/menu.png')}
        />
          <Text style={styles.textCategory}>Categoria Seleccionada: </Text>
          <Text>{category.name}</Text>

      </View>

        <CustomTextInput
            placeholder='Nombre del producto '
            image={require('../../../../../../assets/image_new.png')}
            keyboardType='default'
            property='name'
            value={ name }
            onChangeText={ onChange }
        />

        <CustomTextInput
            placeholder='Descripcion '
            image={require('../../../../../../assets/description.png')}
            keyboardType='default'
            property='description'
            value={ description }
            onChangeText={ onChange }
        />

        <CustomTextInput
            placeholder='Precio '
            image={require('../../../../../../assets/price.png')}
            keyboardType='default'
            property='price'
            value={ price }
            onChangeText={ onChange }
        />


      </View>
        <View style={styles.buttonContainer}>
          <RoundedButton
          text=' Crear Producto'
          onPress={() => createProduct()}
          />
        </View>


        <ModalPickMultipleImage
        openGallery={pickImage}
        openCamera={takePhoto}
        modalUseState={modalVisible}
        setModalUseState={setModalVisible} 
        numberImage={numberImage}          />

        {
          loading && 
          <ActivityIndicator 
            style={MyStyles.loading} 
            size="large" 
            color={ MyColors.primary }  
          />
        }

    </View>
  )
}

