import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseUUIDsReq, BaseUUIDReq } from '/@/api/model/baseModel';
import { ArticleInfo, ArticleListResp } from './model/articleModel';

enum Api {
  CreateArticle = '/cms-api/article/create',
  UpdateArticle = '/cms-api/article/update',
  GetArticleList = '/cms-api/article/list',
  DeleteArticle = '/cms-api/article/delete',
  GetArticleById = '/cms-api/article',
}

/**
 * @description: Get article list
 */

export const getArticleList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ArticleListResp>>(
    { url: Api.GetArticleList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new article
 */
export const createArticle = (params: ArticleInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateArticle, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the article
 */
export const updateArticle = (params: ArticleInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateArticle, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete articles
 */
export const deleteArticle = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteArticle, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get article By ID
 */
export const getArticleById = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ArticleInfo>>(
    { url: Api.GetArticleById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
