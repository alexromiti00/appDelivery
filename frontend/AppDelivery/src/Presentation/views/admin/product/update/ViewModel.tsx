import React, { useState, useContext } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { CreateCategoryUseCase } from '../../../../../Domain/useCases/category/CreateCategory';
import { CategoryContext } from '../../../../context/CategoryContext';
import { Category } from '../../../../../Domain/entities/Category';
import { ProductContext } from '../../../../context/ProductContext';
import { Product } from '../../../../../Domain/entities/Product';

const AdminProductUpdateViewModel = ( product: Product ,category: Category) => {
  
  
    const [values, setValues] = useState(product);
    console.log('Product: ' + JSON.stringify(product));

   
    const [responseMessage, setResponseMessage] = useState('');// Estado del mensaje de exito en el formulario
    const [loading, setLoading] = useState(false);// Estado de carga del formulario
    const [file1, setFile1] = useState<ImagePicker.ImageInfo>()// Estado de la imagen seleccionada o tomada con la cámara
    const [file2, setFile2] = useState<ImagePicker.ImageInfo>()// Estado de la imagen seleccionada o tomada con la cámara
    const [file3, setFile3] = useState<ImagePicker.ImageInfo>()// Estado de la imagen seleccionada o tomada con la cámara
    const { create} = useContext(ProductContext) ;
  
    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

    const createProduct = async () => {
        console.log('Producto Formulario' + JSON.stringify(values))

        let files = [];
        files.push(file1!);
        files.push(file2!);
        files.push(file3!);
        setLoading(true);//Muestra vista de cargando//manda la pantalla antes de la  peticion
        const response = await create(values, files);
        setLoading(false);//Esconde la vista de carga despues de mandar lla peticion
            setResponseMessage(response.message)
            if (response.success) {
                
                resetForm();
            }
            
        
    }



      /**
     * Función para seleccionar una imagen de la galería
     */
      const pickImage = async (numberImage: number) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

        if (!result.cancelled) {

            if (numberImage == 1) {
                onChange('image1', result.uri);
                setFile1(result);
            }
            else if (numberImage == 2) {
                onChange('image2', result.uri);
                setFile2(result);
            }
            else if (numberImage == 3) {
                onChange('image3', result.uri);
                setFile3(result);
            }
        }
        
    }
    
      /**
     * Función para tomar una foto con la cámara
     */
    const takePhoto = async (numberImage: number) => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1
        });

        if (!result.cancelled) {
            if (numberImage == 1) {
                onChange('image1', result.uri);
                setFile1(result);
            }
            else if (numberImage == 2) {
                onChange('image2', result.uri);
                setFile2(result);
            }
            else if (numberImage == 3) {
                onChange('image3', result.uri);
                setFile3(result);
            }
        }
    }
    
    //Resetea los valores del formulario
    const resetForm = async () => {
       setValues({

        name: '',
        description: '',
        image1: '',
        image2: '',
        image3: '',
        price: 0,
        id_category:category.id,

        })
    }
  
  
  
    return {

        ...values,
        onChange,
        takePhoto,
        pickImage,
        createProduct,
        loading,
        responseMessage

    }
}

export default AdminProductUpdateViewModel;

