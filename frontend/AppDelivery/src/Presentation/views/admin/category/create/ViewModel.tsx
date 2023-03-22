import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { CreateCategoryUseCase } from '../../../../../Domain/useCases/category/CreateCategory';

const AdminCategoryCreateViewModel = () => {
  
  
    const [values, setValues] = useState({
        name: '',
        description: '',
        image: ''
    });

   
    const [responseMessage, setResponseMessage] = useState('');// Estado del mensaje de exito en el formulario
    const [loading, setLoading] = useState(false);// Estado de carga del formulario
    const [file, setFile] = useState<ImagePicker.ImageInfo>()// Estado de la imagen seleccionada o tomada con la cámara
  
    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const createCategory = async () => {

        const response = await CreateCategoryUseCase(values, file!);
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
        createCategory,
        loading,
        responseMessage

    }
}

export default AdminCategoryCreateViewModel;

