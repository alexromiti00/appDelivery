
// Importar las dependencias necesarias
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Importar los componentes de las pantallas
import { HomeScreen } from './src/Presentation/views/home/Home';
import { RegisterScreen } from './src/Presentation/views/register/Register';
import { ProfileInfoScreen } from './src/Presentation/views/profile/info/ProfileInfo';
import { RolesScreen } from './src/Presentation/views/roles/Roles';
import { AdminTabsNavigator } from './src/Presentation/navigator/AdminTabsNavigator';
import { ClientTabsNavigator } from './src/Presentation/navigator/ClientTabsNavigator';
import { ProfileUpdateScreen } from './src/Presentation/views/profile/update/ProfileUpdate';
import { User } from './src/Domain/entities/User';
import { UserProvider } from './src/Presentation/context/UserContext';



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

// Definir el componente principal de la aplicación
const App = () => {

   // Renderizar el componente NavigationContainer, que envuelve todo el árbol de componentes de la aplicación
  return (
    <NavigationContainer>
       {/* Renderizar el stack de navegación */}
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
      
    </NavigationContainer>
  );
};

const UserState = ({children}: any) => {

return(
  <UserProvider>
  
  { children }

  </UserProvider>

)
}




// Exportar el componente principal de la aplicación
export default App;