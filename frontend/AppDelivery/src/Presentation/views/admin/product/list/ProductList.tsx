import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator';
import useViewModel from './ViewModel';
import { FlatList } from 'react-native-gesture-handler';


interface Props  extends StackScreenProps<ProductStackParamList, 'AdminProductListScreen'>{};

export const AdminProductListScreen = ({navigation, route}: Props) => {

  const { category } = route.params;
  const { products, getProducts} = useViewModel();

  console.log('Category:' + JSON.stringify(category));

  useEffect(() => {
     getProducts(category.id!);
  }, [])

  return (
   <View style = {{marginTop: 50}}>

        <FlatList 
        data = { products }
        keyExtractor={(item) => (item).id!}
        renderItem={({item}) => <Text>{item.name}</Text>}
        
        
        />

   </View>
  )
}


