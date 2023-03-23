import React, {useState} from 'react'
import { Category } from '../../../../../Domain/entities/Category';
import { GetAllCategoryUseCase } from '../../../../../Domain/useCases/category/GetAllCategory'; 
import { DeleteCategoryUseCase } from '../../../../../Domain/useCases/category/DeleteCategory';

const AdminCategoryListViewModel = () => {
 
    const [categories, setCategories] = useState<Category[]>([]);
    const [responseMensagge, setresponseMensagge] = useState('')

    const getCategories = async() => {

        const result = await GetAllCategoryUseCase();

        console.log('Categories: ' +JSON.stringify(result));

        setCategories(result);


    }
    
      const deleteCategory =async (idCategory: string) =>{

        const result = await DeleteCategoryUseCase(idCategory);
        setresponseMensagge(result.message);
        if (result.success) {
            getCategories();
        }


      }
 
    return {
        categories,
        responseMensagge,
        getCategories,
        deleteCategory
    }
}
export default AdminCategoryListViewModel;

