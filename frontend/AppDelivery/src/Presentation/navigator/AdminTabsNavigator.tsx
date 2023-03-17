import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { AdminCategoryListScreen } from '../views/admin/category/list/CategoryList';
import { AdminOrderListScreen } from '../views/admin/order/list/OrderList';
import { ProfileInfoScreen } from '../views/profile/info/ProfileInfo';

// Crea un nuevo TabNavigator para la pantalla de administrador
const Tab = createBottomTabNavigator();


// Define el TabNavigator y sus respectivas pantallas
export const AdminTabsNavigator = () => {
  return (
    <Tab.Navigator>
      
      {/* Primera pantalla - Lista de Categorías */}
      <Tab.Screen 
        name="AdminCategoryListScreen" 
        component={AdminCategoryListScreen} 
        options={{
          title: 'Categorias', // Texto del encabezado en la pantalla
          tabBarLabel: 'Categorias', // Texto de la pestaña en el TabNavigator
          tabBarIcon: ({ color }) => (// Icono de la pestaña en el TabNavigator
            <Image
              source={ require('../../../assets/list.png') }
              style={{ width: 25, height: 25 }}
              />
          )
        }}
      />
      
      {/* Segunda pantalla - Lista de Pedidos */}
      <Tab.Screen 
        name="AdminOrderListScreen" 
        component={AdminOrderListScreen} 
        options={{
          title: 'Pedidos',
          tabBarLabel: 'Pedidos',
          tabBarIcon: ({ color }) => (
            <Image
              source={ require('../../../assets/orders.png') }
              style={{ width: 25, height: 25 }}
              />
          )
        }}
      />
      
       {/* Tercera pantalla - Información de Perfil */}
      <Tab.Screen 
        name="ProfileInfoScreen" 
        component={ProfileInfoScreen} 
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Image
              source={ require('../../../assets/user_menu.png') }
              style={{ width: 25, height: 25 }}
              />
          )
        }}
      />

    </Tab.Navigator>
  );
}