import React, { useState, useContext } from 'react';
import { ApiDelivery } from '../../../../Data/sources/remote/api/ApiDelivery';
import * as ImagePicker from 'expo-image-picker';
import { SaveUserLocalUseCase } from '../../../../Domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../../hooks/useUserLocal';
import { UpdateUserUseCase } from '../../../../Domain/useCases/user/UpdateUser';
import { UpdateWithImageUseCase } from '../../../../Domain/useCases/user/UpdateWithImageUser';
import { User } from '../../../../Domain/entities/User';
import { ResponseApiDelivery } from '../../../../Data/sources/remote/models/ResponseApiDelivery';
import { UserContext } from '../../../context/UserContext';
/**
 * RegisterViewModel es un componente de React que se encarga de manejar el estado del formulario de registro de usuarios
 * y manejar las acciones de registro, selección de imagen y toma de foto, y validación de formulario. También proporciona
 * el estado de carga y mensaje de error al componente que lo consume.
 */
const ProfileUpdateViewModel = (user: User) => {

    const [errorMessage, setErrorMessage] = useState('');// Estado del mensaje de error en el formulario
    const [successMessage, setSuccessMessage] = useState('');// Estado del mensaje de exito en el formulario
    const [values, setValues] = useState(user);
    const [loading, setLoading] = useState(false);// Estado de carga del formulario
    const [file, setFile] = useState<ImagePicker.ImageInfo>()// Estado de la imagen seleccionada o tomada con la cámara
    const { getUserSession } = useUserLocal();
    const {saveUserSession } = useContext( UserContext)


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

     /**
     * Función para manejar el cambio de valor en el formulario
     * @param property La propiedad del valor que cambia en el formulario
     * @param value El valor que cambia en el formulario
     */
    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }
    
    /**
     * Funcion para actualizar los datos del usuario , actualizacion directa a estos tres valores
     *
     * @param {string} name
     * @param {string} lastname
     * @param {string} phone
     */
    const onChangeInfUpdate = (name: string, lastname: string, phone: string ) => {
        setValues({ ...values, name, lastname, phone})
    }

     /**
     * Función para realizar el registro de usuario con los valores del formulario
     */
    const update = async () => {
        if (isValidForm()) {// Si el formulario es válido
            setLoading(true);// Establecer el estado de carga a verdadero

            let response = {} as ResponseApiDelivery;
            if (values.image?.includes('https://')) {
                 response = await UpdateUserUseCase(values);// Registrar usuario sin actualizar la imagen
            }
           else{
             response = await UpdateWithImageUseCase(values, file!);// Registrar usuario sin actualizar la imagen
           }
            setLoading(false);// Establecer el estado de carga a falso
            console.log('RESULT: ' + JSON.stringify(response));  // Mostrar la respuesta del registro en la consola      
            if (response.success) {// Si el registro fue exitoso
                saveUserSession(response.data);// Muestra en tiempo real los datos actualizados
                setSuccessMessage(response.message);// Obtener la sesión del usuario
            }
            else {
                setErrorMessage(response.message);
            }
        }
    }

    /**
     * Función que valida si el formulario de registro está completo y correcto.
     * @returns true si el formulario es válido, false en caso contrario.
     */
    const isValidForm = (): boolean => {
        if (values.name === '') {
            setErrorMessage('Ingresa tu nombre');
            return false;
        }
        if (values.lastname === '') {
            setErrorMessage('Ingresa tu apellido');
            return false;
        }
        if (values.phone === '') {
            setErrorMessage('Ingresa tu telefono');
            return false;
        }
       
       

        return true;
    }

    /**
     * Devuelve un objeto con las propiedades necesarias para la vista de registro.
     */
    return {
        ...values,
        onChange,
        onChangeInfUpdate,
        update,
        pickImage,
        takePhoto,
        errorMessage,
        successMessage,
        loading,
        user
    }
}

export default ProfileUpdateViewModel;
