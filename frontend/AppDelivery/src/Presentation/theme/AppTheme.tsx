import { StyleSheet } from 'react-native'
import mime from 'mime';

/**
 * Objeto con colores personalizados para la aplicación
 */
export const MyColors = {

    /**
     * Color primario
     * @type {string}
     */
    primary: '#F4991A',
    /**
     * Color secundario
     * @type {string}
     */
    secondary: '#E14D2A',
    /**
     * Color de fondo
     * @type {string}
     */
    background: '#EEEEEE'
}

export const MyStyles = StyleSheet.create({
    
    loading: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left:0, 
    }

});