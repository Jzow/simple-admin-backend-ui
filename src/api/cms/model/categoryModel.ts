import { BaseListResp } from '/@/api/model/baseModel';

/**
 *  @description: Category info response
 */
export interface CategoryInfo {
  id: number;
  createdAt?: number;
  updatedAt?: number;
  state?: boolean;
  sort?: number;
  title?: string;
  shortTitle?: string;
  banner?: string;
  description?: string;
  isLeaf?: boolean;
  parentId?: number;
}

/**
 *  @description: Category list response
 */

export type CategoryListResp = BaseListResp<CategoryInfo>;
