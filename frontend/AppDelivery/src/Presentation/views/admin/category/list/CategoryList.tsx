import React, { useEffect} from 'react'
import { Text, ToastAndroid, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { AdminCategoryListItem } from './Item';
import useViewModel from './ViewModel';


export const AdminCategoryListScreen = () => {
 
 const { categories,responseMensagge, getCategories, deleteCategory } = useViewModel();



  useEffect(() => {
    if (responseMensagge !== '') {
        ToastAndroid.show(responseMensagge, ToastAndroid.LONG);
    }
  }, [responseMensagge])
 
 
  return (
    <View style={{ backgroundColor: 'white'}}>
        <FlatList
            data={ categories }
            keyExtractor={(item) => (item).id!}
            renderItem={({item}) => <AdminCategoryListItem category={item} remove ={deleteCategory}/>}
            />
    </View>
  )
}
