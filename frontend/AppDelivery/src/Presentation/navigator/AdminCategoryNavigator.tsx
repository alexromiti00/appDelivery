import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { Category } from '../../Domain/entities/Category';
import { CategoryProvider } from '../context/CategoryContext';
import { AdminCategoryCreateScreen } from '../views/admin/category/create/CategoryCreate';
import { AdminCategoryUpdateScreen } from '../views/admin/category/update/CategoryUpdate';
import { AdminCategoryListScreen } from '../views/admin/category/list/CategoryList';
import { Image, TouchableOpacity } from 'react-native';
import { AdminProductNavigator } from './AdminProductNavigator'


export  type CategoryStackParamList = {


    AdminCategoryListScreen: undefined,
    AdminCategoryCreateScreen: undefined,
    AdminCategoryUpdateScreen: {category: Category},
    AdminProductNavigator: {category: Category},
    
}

const Stack = createNativeStackNavigator<CategoryStackParamList>();

export const AdminCategoryNavigator = () => {
  
    return (

    
    <CategoryState>

    <Stack.Navigator screenOptions={{
        headerShown: false // Ocultar la barra de navegación por defecto
      }}>

        <Stack.Screen
            name="AdminCategoryListScreen"
            component={AdminCategoryListScreen}
              options={ ({route, navigation}) => (
                {
                    headerShown: true,
                  title: 'Categorias',
                  headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('AdminCategoryCreateScreen')}>
                    <Image
                        source={ require('../../../assets/add.png') }
                        style={{ width:35, height: 35 }}
                    />
                    </TouchableOpacity>
                     )       
                }
             )}
           />   
        <Stack.Screen
          name="AdminCategoryCreateScreen"
          component={AdminCategoryCreateScreen}
          options={{
            headerShown: true, // Mostrar la barra de navegación
            title: 'Nueva categoria' // Definir el título de la barra de navegación
        }} />

        <Stack.Screen
            name="AdminCategoryUpdateScreen"
            component={AdminCategoryUpdateScreen}
            options={{
                headerShown: true, // Mostrar la barra de navegación
                title: 'Editar categoria' // Definir el título de la barra de navegación
            }} />

<Stack.Screen
            name="AdminProductNavigator"
            component={AdminProductNavigator}
             />

        </Stack.Navigator>
    </CategoryState>


  )
}


 //Nos permite esparcir la informacion por las pantallas por el context que realizamos
const CategoryState = ({children}: any) => {
  return(
    <CategoryProvider>
    
    { children }
  
    </CategoryProvider>
  
  )
  }