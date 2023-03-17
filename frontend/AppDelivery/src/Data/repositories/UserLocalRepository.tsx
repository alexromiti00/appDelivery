import { User } from '../../Domain/entities/User';
import { UserLocalRepository } from '../../Domain/repositories/UserLocalRepository';
import { LocalStorage } from '../sources/local/LocalStorage';

export class UserLocalRepositoryImpl implements UserLocalRepository {

    /**
     * Guarda el usuario proporcionado en el almacenamiento local.
     * @param user El objeto User a ser guardado.
     * @returns Una promesa que se resuelve cuando se ha guardado el usuario.
     */

    async save(user: User): Promise<void> {
        const { save } = LocalStorage();
        await save('user', JSON.stringify(user));
    }

     /**
     * Recupera el objeto User guardado previamente en el almacenamiento local.
     * @returns Una promesa que se resuelve con el objeto User recuperado.
     */
    async getUser(): Promise<User> {
        const { getItem } = LocalStorage();
        const data = await getItem('user');
        const user: User = JSON.parse(data as any);
        return user;
    }

    /**
     * Elimina el objeto User guardado previamente en el almacenamiento local.
     * @returns Una promesa que se resuelve cuando se ha eliminado el usuario.
     */
    async remove(): Promise<void> {
        const { remove } = LocalStorage();
        await remove('user');
    }

}