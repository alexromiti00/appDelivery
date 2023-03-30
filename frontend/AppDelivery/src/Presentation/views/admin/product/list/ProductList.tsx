import React from 'react'
import { Text, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { ProductStackParamList } from '../../../../navigator/AdminProductNavigator';


interface Props  extends StackScreenProps<ProductStackParamList, 'AdminProductListScreen'>{};

export const AdminProductListScreen = ({navigation, route}: Props) => {

  const { category } = route.params;
  console.log('Category:' + JSON.stringify(category));

  return (
   <View style = {{marginTop: 50}}>

        <Text> AdminProductListScreen </Text>

   </View>
  )
}


