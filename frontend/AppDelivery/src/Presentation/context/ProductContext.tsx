import { Product } from '../../Domain/entities/Product';
import * as ImagePicker from 'expo-image-picker';
import { ResponseApiDelivery } from "../../Data/sources/remote/models/ResponseApiDelivery";
import { createContext } from 'react';
import { CreateProductUseCase } from '../../Domain/useCases/product/CreateProduct';


export interface ProductContextProps{

    create(product: Product, files: ImagePicker.ImageInfo[]): Promise<ResponseApiDelivery>

}

export const ProductContext = createContext ({} as ProductContextProps);

export const ProductProvider = ({ children }: any ) =>{

    const create = async (product: Product,  file: ImagePicker.ImageInfo[]): Promise<ResponseApiDelivery> => {

        const response = await  CreateProductUseCase(product, file);
        
        return response;
    }

    return (
    <ProductContext.Provider value={{

        create

    }}>

         {/*Sin este children no renderiza ninguna pantalla */}
         { children }

    </ProductContext.Provider>
    )
}







