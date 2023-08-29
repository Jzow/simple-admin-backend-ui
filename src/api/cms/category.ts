import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '/@/api/model/baseModel';
import { CategoryInfo, CategoryListResp } from './model/categoryModel';

enum Api {
  CreateCategory = '/cms-api/article_category/create',
  UpdateCategory = '/cms-api/article_category/update',
  GetCategoryList = '/cms-api/article_category/list',
  DeleteCategory = '/cms-api/article_category/delete',
  GetCategoryById = '/cms-api/article_category',
}

/**
 * @description: Get category list
 */

export const getCategoryList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<CategoryListResp>>(
    { url: Api.GetCategoryList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new category
 */
export const createCategory = (params: CategoryInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateCategory, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the category
 */
export const updateCategory = (params: CategoryInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateCategory, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete categorys
 */
export const deleteCategory = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteCategory, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get category By ID
 */
export const getCategoryById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<CategoryInfo>>(
    { url: Api.GetCategoryById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
