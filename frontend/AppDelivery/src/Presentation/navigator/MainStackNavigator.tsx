// Importar los componentes de las pantallas
import { HomeScreen } from '../../../src/Presentation/views/home/Home';
import { RegisterScreen } from '../../../src/Presentation/views/register/Register';
import { ProfileInfoScreen } from '../../../src/Presentation/views/profile/info/ProfileInfo';
import { RolesScreen } from '../../../src/Presentation/views/roles/Roles';
import { AdminTabsNavigator } from '../../../src/Presentation/navigator/AdminTabsNavigator';
import { ClientTabsNavigator } from '../../../src/Presentation/navigator/ClientTabsNavigator';
import { ProfileUpdateScreen } from '../../../src/Presentation/views/profile/update/ProfileUpdate';
import { AdminCategoryListScreen } from '../../../src/Presentation/views/admin/category/list/CategoryList';
import { AdminCategoryCreateScreen } from '../../../src/Presentation/views/admin/category/create/CategoryCreate'
import { AdminCategoryUpdateScreen } from '../../../src/Presentation/views/admin/category/update/CategoryUpdate';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { Category } from '../../Domain/entities/Category';
import { User } from '../../Domain/entities/User';
import { UserProvider } from '../context/UserContext';




// Definir la interfaz para los nombres de pantalla y los tipos de parámetros aceptados
export type RootStackParamList = {
    HomeScreen: undefined,
    RegisterScreen: undefined,
    RolesScreen: undefined,
    ProfileUpdateScreen: {user: User},
    AdminTabsNavigator: undefined,
    ClientTabsNavigator: undefined,
   
  }

// Crear un stack de navegación nativo utilizando la interfaz definida anteriormente
const Stack = createNativeStackNavigator<RootStackParamList>();



export const MainStackNavigator = () => {
  return (
    <UserState>

       <Stack.Navigator screenOptions={{
        headerShown: false // Ocultar la barra de navegación por defecto
      }}>

         {/* Agregar cada pantalla al stack de navegación */}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        
        <Stack.Screen 
          name="RegisterScreen" 
          component={RegisterScreen}
          options={{
            headerShown: true, // Mostrar la barra de navegación
            title: 'Nuevo usuario' // Definir el título de la barra de navegación
          }}  />

      
        <Stack.Screen 
          name="RolesScreen" 
          component={RolesScreen}
          options={{
            headerShown: true, // Mostrar la barra de navegación
            title: 'Selecciona un rol' // Definir el título de la barra de navegación
          }}  />

      <Stack.Screen
          name="AdminTabsNavigator"
          component={AdminTabsNavigator}
      />
      
      <Stack.Screen
          name="ClientTabsNavigator"
          component={ClientTabsNavigator}
        />

      <Stack.Screen
          name="ProfileUpdateScreen"
          component={ProfileUpdateScreen}
          options={{
            headerShown: true, // Mostrar la barra de navegación
            title: 'Actualizar Usuario' // Definir el título de la barra de navegación
          }} />
        
      </Stack.Navigator>
       </UserState>
  )
}

//Nos permite esparcir la informacion por las pantallas por el context que realizamos
const UserState = ({children}: any) => {
    return(
      <UserProvider>
      
      { children }
  
      </UserProvider>
    )
  }
