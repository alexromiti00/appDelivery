import { ResponseApiDelivery } from '../../Data/sources/remote/models/ResponseApiDelivery';
import { Category } from '../entities/Category';
import * as ImagePicker from 'expo-image-picker';
export interface CategoryRepository{

    getAll(): Promise<Category[]>;//Regresamos una lista

    create(Category: Category, file: ImagePicker.ImageInfo): Promise<ResponseApiDelivery>;

    remove(id: string): Promise<ResponseApiDelivery>;


}