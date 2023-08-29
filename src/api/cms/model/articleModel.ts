import { BaseListResp } from '/@/api/model/baseModel';

/**
 *  @description: Article info response
 */
export interface ArticleInfo {
  id: string;
  createdAt?: number;
  updatedAt?: number;
  status?: number;
  title?: string;
  shortTitle?: string;
  keyword?: string;
  img?: string;
  content?: string;
  author?: string;
  source?: string;
  hit?: number;
  thumbnail?: string;
  isRecommended?: boolean;
  categoryId?: number;
  tagIds?: number[];
}

/**
 *  @description: Article list response
 */

export type ArticleListResp = BaseListResp<ArticleInfo>;
