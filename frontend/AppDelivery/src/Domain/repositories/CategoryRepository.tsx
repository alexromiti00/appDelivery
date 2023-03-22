import { ResponseApiDelivery } from '../../Data/sources/remote/models/ResponseApiDelivery';
import { Category } from '../entities/Category';
import * as ImagePicker from 'expo-image-picker';
export interface CategoryRepository{

    create(Category: Category, file: ImagePicker.ImageInfo): Promise<ResponseApiDelivery>;




}