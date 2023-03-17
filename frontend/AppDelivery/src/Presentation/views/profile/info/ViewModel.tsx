
import React, { useContext } from 'react'
import { RemoveUserLocalUseCase } from '../../../../Domain/useCases/userLocal/RemoveUserLocal';
import { UserContext } from '../../../context/UserContext';

/**
 * Este es el ViewModel de la pantalla de información del perfil de usuario.
 * Proporciona una función para eliminar la sesión del usuario.
 * @returns Objeto con la función `removeSession`
 */
const ProfileInfoViewModel = () => {

    const { user, removeUserSession } = useContext( UserContext);

    /**
     * Elimina la sesión del usuario localmente.
     * @returns {Promise<void>} - Promesa que se resuelve después de eliminar la sesión del usuario.
     */
 
    return {
        removeUserSession,
        user
    }
}

export default ProfileInfoViewModel;
