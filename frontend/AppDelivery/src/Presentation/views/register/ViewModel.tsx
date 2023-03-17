import React, { useState } from 'react';
import { ApiDelivery } from '../../../Data/sources/remote/api/ApiDelivery';
import { RegisterAuthUseCase } from '../../../Domain/useCases/auth/RegisterAuth';
import { RegisterWithImageAuthUseCase } from '../../../Domain/useCases/auth/RegisterWithImageAuth';
import * as ImagePicker from 'expo-image-picker';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';

/**
 * RegisterViewModel es un componente de React que se encarga de manejar el estado del formulario de registro de usuarios
 * y manejar las acciones de registro, selección de imagen y toma de foto, y validación de formulario. También proporciona
 * el estado de carga y mensaje de error al componente que lo consume.
 */
const RegisterViewModel = () => {

    const [errorMessage, setErrorMessage] = useState('');// Estado del mensaje de error en el formulario
    const [values, setValues] = useState({// Estado de los valores del formulario
        name: '',
        lastname: '',
        phone: '',
        email: '',
        image: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);// Estado de carga del formulario
    const [file, setFile] = useState<ImagePicker.ImageInfo>()// Estado de la imagen seleccionada o tomada con la cámara
    const { user, getUserSession } = useUserLocal();// Estado del usuario local y función para obtener la sesión del usuario


    
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
     * Función para realizar el registro de usuario con los valores del formulario
     */
    const register = async () => {
        if (isValidForm()) {// Si el formulario es válido
            setLoading(true);// Establecer el estado de carga a verdadero
            // const response = await RegisterAuthUseCase(values); // Registrar usuario sin imagen
            const response = await RegisterWithImageAuthUseCase(values, file!);// Registrar usuario con imagen
            setLoading(false);// Establecer el estado de carga a falso
            console.log('RESULT: ' + JSON.stringify(response));  // Mostrar la respuesta del registro en la consola      
            if (response.success) {// Si el registro fue exitoso
                await SaveUserLocalUseCase(response.data);// Guardar datos del usuario en local storage
                getUserSession();// Obtener la sesión del usuario
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
        if (values.email === '') {
            setErrorMessage('Ingresa tu correo electronico');
            return false;
        }
        if (values.phone === '') {
            setErrorMessage('Ingresa tu telefono');
            return false;
        }
        if (values.password === '') {
            setErrorMessage('Ingresa la contraseña');
            return false;
        }
        if (values.confirmPassword === '') {
            setErrorMessage('Ingresa la confirmacion de la contraseña');
            return false;
        }
        if (values.password !== values.confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
            return false;
        }
        if (values.image === '') {
            setErrorMessage('Selecciona una imagen');
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
        register,
        pickImage,
        takePhoto,
        errorMessage,
        loading,
        user
    }
}

export default RegisterViewModel;
