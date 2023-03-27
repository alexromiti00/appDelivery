import React, {useState, useContext} from 'react'
import { Category } from '../../../../../Domain/entities/Category';
import { GetAllCategoryUseCase } from '../../../../../Domain/useCases/category/GetAllCategory'; 
import { DeleteCategoryUseCase } from '../../../../../Domain/useCases/category/DeleteCategory';
import { CategoryContext } from '../../../../context/CategoryContext';

const AdminCategoryListViewModel = () => {
 

    const [responseMensagge, setresponseMensagge] = useState('');
    const { categories, getCategories,remove } = useContext(CategoryContext)

    
      const deleteCategory =async (idCategory: string) =>{

        const result = await remove(idCategory);
        setresponseMensagge(result.message);
      


      }
 
    return {
        categories,
        responseMensagge,
        getCategories,
        deleteCategory
    }
}
export default AdminCategoryListViewModel;

