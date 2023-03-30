import { AxiosError } from 'axios';
import { ImageInfo } from 'expo-image-picker';
import mime from 'mime';
import { Product } from '../../Domain/entities/Product';
import { ProductRepository } from '../../Domain/repositories/ProductRepository';
import { ApiDeliveryForImage } from '../sources/remote/api/ApiDelivery';
import { ResponseApiDelivery } from '../sources/remote/models/ResponseApiDelivery';



export class ProductRepositoryImpl implements ProductRepository{

        async create(product: Product, files: ImageInfo[]): Promise<ResponseApiDelivery> {
            
            try {

            // Creamos un objeto FormData para enviar la imagen y los datos del usuario a la API
             let data = new FormData();

            files.forEach(file => {

                    data.append('image', {
                           // @ts-ignore
                             uri: file.uri,
                            name: file.uri.split('/').pop(),
                            type: mime.getType(file.uri)!
                    });
             });
             data.append('product', JSON.stringify(product));
             // Hacemos una solicitud HTTP POST para registrar el usuario con la imagen en la API
            const response = await ApiDeliveryForImage.post<ResponseApiDelivery>('/products/create', data);
            return Promise.resolve(response.data);
                
            } catch (error) {

                // Si hay un error en la solicitud, lo manejamos y devolvemos un objeto de error de la API
            let e = (error as AxiosError);
            console.log('ERROR: ' + JSON.stringify(e.response?.data));
            const apiError:ResponseApiDelivery = JSON.parse(JSON.stringify(e.response?.data)); 
            return Promise.resolve(apiError)
            }


        }

}

