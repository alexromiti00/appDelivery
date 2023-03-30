import * as ImagePicker from 'expo-image-picker';
import { ResponseApiDelivery } from '../../Data/sources/remote/models/ResponseApiDelivery';
import { Product } from '../entities/Product';

 export interface ProductRepository {


    create(product: Product, files: ImagePicker.ImageInfo[]): Promise<ResponseApiDelivery>;





 }