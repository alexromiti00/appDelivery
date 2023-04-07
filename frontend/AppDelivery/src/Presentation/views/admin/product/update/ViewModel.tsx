import React, { useState, useContext } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { CreateCategoryUseCase } from '../../../../../Domain/useCases/category/CreateCategory';
import { CategoryContext } from '../../../../context/CategoryContext';
import { Category } from '../../../../../Domain/entities/Category';
import { ProductContext } from '../../../../context/ProductContext';
import { Product } from '../../../../../Domain/entities/Product';
import { ResponseApiDelivery } from '../../../../../Data/sources/remote/models/ResponseApiDelivery';

const AdminProductUpdateViewModel = ( product: Product ,category: Category) => {
  
  
    const [values, setValues] = useState(product);
    console.log('Product: ' + JSON.stringify(product));

   
    const [responseMessage, setResponseMessage] = useState('');// Estado del mensaje de exito en el formulario
    const [loading, setLoading] = useState(false);// Estado de carga del formulario
    const [file1, setFile1] = useState<ImagePicker.ImageInfo>()// Estado de la imagen seleccionada o tomada con la cámara
    const [file2, setFile2] = useState<ImagePicker.ImageInfo>()// Estado de la imagen seleccionada o tomada con la cámara
    const [file3, setFile3] = useState<ImagePicker.ImageInfo>()// Estado de la imagen seleccionada o tomada con la cámara
    const { update, updateWihtImage, updateWihtImage3, updateWihtImage2, updateWihtImage1, updateWihtImage1and2, updateWihtImage1and3, updateWihtImage2and3} = useContext(ProductContext) ;
  
    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value });
    }

        console.log('Prueba Actualizacion1Pre' + JSON.stringify(values.image1));
        console.log('Prueba Actualizacion2Pre' + JSON.stringify(values.image2));
        console.log('Prueba Actualizacion3Pre' + JSON.stringify(values.image3));

    const updateProduct = async () => {
        console.log('Producto Formulario' + JSON.stringify(values));

        let files = [];
        files.push(file1!);
        files.push(file2!);
        files.push(file3!);

        let files1 = [];
        files1.push(file1!);

        let files2 = [];
        files2.push(file2!);

        let files3 = [];
        files3.push(file3!);

        let files1and2  = [];
        files1and2.push(file1!);
        files1and2.push(file2!);

        let files1and3  = [];
        files1and3.push(file1!);
        files1and3.push(file3!);

        let files2and3  = [];
        files2and3.push(file2!);
        files2and3.push(file3!);




        setLoading(true);//Muestra vista de cargando//manda la pantalla antes de la  peticion
        
        let response = {} as ResponseApiDelivery;

        console.log('Prueba Actualizacion1' + JSON.stringify(values.image1));
        console.log('Prueba Actualizacion2' + JSON.stringify(values.image2));
        console.log('Prueba Actualizacion3' + JSON.stringify(values.image3));

        if (values.image1.includes('https://') && values.image2.includes('https://') && values.image3.includes('https://')) {
            console.log('Entro el metodo update' );
            response = await update(values);
        }
        else if (values.image1.includes('file:///') && values.image2.includes('file:///')) {
            console.log('Entro el metodo updateWihtImage1and2' );
            response = await updateWihtImage1and2(values, files1and2);
        }
        else if (values.image1.includes('file:///') && values.image3.includes('file:///')) {
            console.log('Entro el metodo updateWihtImage1and3' );
            response = await updateWihtImage1and3(values, files1and3);
        }
        else if (values.image2.includes('file:///') && values.image3.includes('file:///')) {
            console.log('Entro el metodo updateWihtImage2and3' );
            response = await updateWihtImage2and3(values, files2and3);
        }
        else if (values.image1.includes('file:///')) {
            console.log('Entro el metodo updateWihtImage1' );
            response = await updateWihtImage1(values, files1);
        }
        else if (values.image2.includes('file:///')) {
            console.log('Entro el metodo updateWihtImage2' );
            response = await updateWihtImage2(values, files2);
        }
        else if (values.image3.includes('file:///')) {
            console.log('Entro el metodo updateWihtImage3' );
            response = await updateWihtImage3(values, files3);
        }
        else{
            console.log('Entro el metodo updateWihtImage' );
            response = await updateWihtImage(values, files);
        }
        setLoading(false);//Esconde la vista de carga despues de mandar lla peticion
            setResponseMessage(response.message);
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
   /* const resetForm = async () => {
       setValues({

        name: '',
        description: '',
        image1: '',
        image2: '',
        image3: '',
        price: 0,
        id_category:category.id,

        })
    }*/
  
  
  
    return {

        ...values,
        onChange,
        takePhoto,
        pickImage,
        updateProduct,
        loading,
        responseMessage

    }
}

export default AdminProductUpdateViewModel;

