import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { MyColors } from '../theme/AppTheme'

interface Props {
    text: string,// Texto que se mostrará en el botón
    onPress: () => void// Función que se ejecutará cuando se presione el botón
}

/**
 * Componente que representa un botón redondeado con un fondo de color primario.
 * 
 * @param text Texto que se mostrará en el botón
 * @param onPress Función que se ejecutará cuando se presione el botón
 */
export const RoundedButton = ({ text, onPress }: Props) => {
  return (
    <TouchableOpacity
        style={ styles.roundedButton }
        onPress={() => onPress()}
    >
        <Text style={ styles.textButton }>{ text }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    roundedButton: {
        width: '100%',
        height: 50,
        backgroundColor: MyColors.primary,// Color de fondo del botón
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15// Radio de los bordes del botón
    },
    textButton: {
        color: 'white',// Color del texto del botón
        // fontWeight: 'bold'
    }
});
