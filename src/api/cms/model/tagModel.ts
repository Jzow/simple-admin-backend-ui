import { BaseListResp } from '/@/api/model/baseModel';

/**
 *  @description: Tag info response
 */
export interface TagInfo {
  id: number;
  createdAt?: number;
  updatedAt?: number;
  title?: string;
}

/**
 *  @description: Tag list response
 */

export type TagListResp = BaseListResp<TagInfo>;
