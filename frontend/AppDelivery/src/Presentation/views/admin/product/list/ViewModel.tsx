import React, { useContext, useState} from 'react'
import { ProductContext } from '../../../../context/ProductContext';
import { Product } from '../../../../../Domain/entities/Product';

const AdminProductListViewModel = () => {
     

    const {products, getProducts, remove} = useContext(ProductContext);

    const [responseMessage, setresponseMessage] = useState('');
  
    const deleteProduct =async (product: Product) =>{

        const result = await remove(product);
        setresponseMessage(result.message);
      


      }
  
  
    return {
        products,
        responseMessage,
        getProducts,
        deleteProduct


    }
}

export default AdminProductListViewModel;
