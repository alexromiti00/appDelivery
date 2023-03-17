/**
 * Interface que representa un Rol de usuario.
 */

export interface Rol {
    /**
   * Identificador del Rol.
   */
    id: string,
     /**
   * Nombre del Rol.
   */
    name: string,
    /**
   * Ruta de la imagen asociada al Rol.
   */
    image: string,
    /**
   * Ruta de la página asociada al Rol.
   */
    route: string
}