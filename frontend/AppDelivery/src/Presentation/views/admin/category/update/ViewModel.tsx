import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Category } from '../../../../../Domain/entities/Category';
import { UpdateCategoryUseCase } from '../../../../../Domain/useCases/category/UpdateCategoy';
import { UpdateWhitImageCategoryUseCase } from '../../../../../Domain/useCases/category/UpdateWhitImageCategory';
import { ResponseApiDelivery } from '../../../../../Data/sources/remote/models/ResponseApiDelivery';

const AdminCategoryUpdateViewModel = (category: Category) => {
  
  
    const [values, setValues] = useState(category);//Trae toda la informacion de la categoria a editar

   
    const [responseMessage, setResponseMessage] = useState('');// Estado del mensaje de exito en el formulario
    const [loading, setLoading] = useState(false);// Estado de carga del formulario
    const [file, setFile] = useState<ImagePicker.ImageInfo>()// Estado de la imagen seleccionada o tomada con la cámara
  
    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const updateCategory = async () => {
        setLoading(true);//Muestra vista de cargando//manda la pantalla antes de la  peticion

        let response = {} as ResponseApiDelivery;

        if (values.image?.includes('https://')) {//Actualizar sin imagen

            response = await UpdateCategoryUseCase(values);
        }
        else{//Actualiza con imagen

            response = await UpdateWhitImageCategoryUseCase(values, file!);
        }
        

        setLoading(false);//Esconde la vista de carga despues de mandar lla peticion
            setResponseMessage(response.message)
    }



      /**
     * Función para seleccionar una imagen de la galería
     */
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

        if (!result.cancelled) {
            onChange('image', result.uri);
            setFile(result);
        }
    }
    
      /**
     * Función para tomar una foto con la cámara
     */
    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

        if (!result.cancelled) {
            onChange('image', result.uri);
            setFile(result);
        }
    }
    

  
    return {

        ...values,
        onChange,
        takePhoto,
        pickImage,
        updateCategory,
        loading,
        responseMessage

    }
}

export default AdminCategoryUpdateViewModel;

