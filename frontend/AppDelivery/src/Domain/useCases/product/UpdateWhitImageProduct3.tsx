import { ProductRepositoryImpl } from "../../../Data/repositories/ProductRepository";
import { Product } from "../../entities/Product";
import * as ImagePicker from 'expo-image-picker';


const { updateWihtImage3 } = new ProductRepositoryImpl();

export const UpdateWhitImage3ProductUseCase = async(product: Product, files: ImagePicker.ImageInfo[]) => {


    return await updateWihtImage3 (product, files);


}