import React from 'react'
import { CategoryRepositoryImpl } from '../../../Data/repositories/CategoryRepository'
import { Category } from '../../entities/Category';
import * as ImagePicker from 'expo-image-picker';

const { create } = new CategoryRepositoryImpl

export const CreateCategoryUseCase = async (Category: Category, file: ImagePicker.ImageInfo) => {
  return await create (Category, file)
}

