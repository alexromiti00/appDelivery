import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Touchable, TouchableOpacity } from 'react-native';
import { AdminCategoryListScreen } from '../views/admin/category/list/CategoryList';
import { AdminOrderListScreen } from '../views/admin/order/list/OrderList';
import { ProfileInfoScreen } from '../views/profile/info/ProfileInfo';
import { AdminCategoryNavigator }  from './AdminCategoryNavigator'

// Crea un nuevo TabNavigator para la pantalla de administrador
const Tab = createBottomTabNavigator();


// Define el TabNavigator y sus respectivas pantallas
export const AdminTabsNavigator = () => {
  return (
    <Tab.Navigator
     screenOptions={{
        headerShown: false
     }}
    >
      
      {/* Primera pantalla - Lista de Categorías */}
      <Tab.Screen 
        name="AdminCategoryNavigator" 
        component={AdminCategoryNavigator} 
        options={({route, navigation}) =>(

          {
            title: 'Categorias',
            tabBarLabel: 'Categorias',
            tabBarIcon: () => (
              <Image
              source={ require('../../../assets/list.png') }
              style={{ width: 25, height: 25 }}
              />
          ),
          headerRight:  () => (
  
              <TouchableOpacity  onPress= {() =>  navigation.navigate('AdminCategoryCreateScreen')}>
  
              <Image
                  source={ require('../../../assets/add.png') }
                  style={{width: 35, height: 35, marginRight: 20 }}
              />
  
              </TouchableOpacity>
          )
          }
    )}
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