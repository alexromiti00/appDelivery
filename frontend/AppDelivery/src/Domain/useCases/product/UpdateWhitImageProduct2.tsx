import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";
import * as ImagePicker from 'expo-image-picker';


const { updateWihtImage2 } = new ProductRepositoryImpl();

export const UpdateWhitImage2ProductUseCase = async(product: Product, files: ImagePicker.ImageInfo[]) => {


    return await updateWihtImage2 (product, files);


}