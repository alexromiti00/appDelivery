import { AuthRepositoryImpl } from "../../../Data/repositories/AuthRepository";
import { User } from "../../entities/User";
import * as ImagePicker from 'expo-image-picker';

const { registerWithImage } = new AuthRepositoryImpl();

/**
 * Registra un nuevo usuario con una imagen.
 * @param user - Los datos del usuario que se registrará.
 * @param file - La información de la imagen del usuario.
 * @returns Una promesa que se resuelve en un objeto ResponseApiDelivery.
 */
export const RegisterWithImageAuthUseCase = async (user: User, file: ImagePicker.ImageInfo) => {
    return await registerWithImage(user, file);
}