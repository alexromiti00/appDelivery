/**
 * Interfaz que define los métodos necesarios para acceder y manipular la información de usuario en el almacenamiento local.
 */
import { User } from "../entities/User";

export interface UserLocalRepository {
    /**
     * Guarda la información del usuario en el almacenamiento local.
     * @param user Objeto que contiene la información del usuario a guardar.
     * @returns Una promesa que resuelve con void si la operación se realiza con éxito o se rechaza con un error si la operación falla.
     */
    save(user: User): Promise<void>;

     /**
     * Obtiene la información del usuario guardada en el almacenamiento local.
     * @returns Una promesa que resuelve con el objeto User si la operación se realiza con éxito o se rechaza con un error si la operación falla.
     */
    getUser(): Promise<User>;

    /**
     * Elimina la información del usuario guardada en el almacenamiento local.
     * @returns Una promesa que resuelve con void si la operación se realiza con éxito o se rechaza con un error si la operación falla.
     */
    remove(): Promise<void>;
}