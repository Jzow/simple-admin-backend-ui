import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { updateArticle } from '/@/api/cms/article';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';
import { getTagList } from '/@/api/cms/tag';
import { getCategoryList } from '/@/api/cms/category';
const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('cms.article.title'),
    dataIndex: 'title',
    width: 100,
  },
  {
    title: t('cms.article.source'),
    dataIndex: 'source',
    width: 100,
  },
  {
    title: t('common.status'),
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: t('common.on'),
        unCheckedChildren: t('common.off'),
        loading: record.pendingStatus,
        onChange(checked, _) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 2;
          updateArticle({ id: record.id, status: newStatus })
            .then(() => {
              record.status = newStatus;
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 70,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: t('cms.article.title'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'shortTitle',
    label: t('cms.article.shortTitle'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'keyword',
    label: t('cms.article.keyword'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'categoryId',
    label: t('cms.article.categoryId'),
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      api: getCategoryList,
      params: {
        page: 1,
        pageSize: 1000,
        title: '',
      },
      resultField: 'data.data',
      labelField: 'title',
      valueField: 'id',
    },
  },
  {
    field: 'tagIds',
    label: t('cms.article.tagIds'),
    colProps: { span: 8 },
    component: 'ApiMultipleSelect',
    componentProps: {
      api: getTagList,
      params: {
        page: 1,
        pageSize: 1000,
        title: '',
      },
      resultField: 'data.data',
      labelField: 'title',
      valueField: 'id',
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },

  {
    field: 'title',
    label: t('cms.article.title'),
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'shortTitle',
    label: t('cms.article.shortTitle'),
    component: 'Input',
    required: true,
  },
  {
    field: 'keyword',
    label: t('cms.article.keyword'),
    component: 'Input',
    required: true,
  },
  {
    field: 'img',
    label: t('cms.article.img'),
    component: 'Input',
  },
  {
    field: 'content',
    label: t('cms.article.content'),
    component: 'Tinymce',
    required: true,
  },
  {
    field: 'author',
    label: t('cms.article.author'),
    component: 'Input',
    required: true,
  },
  {
    field: 'source',
    label: t('cms.article.source'),
    component: 'Input',
  },
  {
    field: 'hit',
    label: t('cms.article.hit'),
    component: 'InputNumber',
    defaultValue: 0,
  },
  {
    field: 'categoryId',
    label: t('cms.article.categoryId'),
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getCategoryList,
      params: {
        page: 1,
        pageSize: 1000,
        title: '',
      },
      resultField: 'data.data',
      labelField: 'title',
      valueField: 'id',
    },
  },
  {
    field: 'tagIds',
    label: t('cms.article.tagIds'),
    required: true,
    component: 'ApiMultipleSelect',
    componentProps: {
      api: getTagList,
      params: {
        page: 1,
        pageSize: 1000,
        title: '',
      },
      resultField: 'data.data',
      labelField: 'title',
      valueField: 'id',
    },
  },
  {
    field: 'status',
    label: t('cms.article.status'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.on'), value: 1 },
        { label: t('common.off'), value: 2 },
      ],
    },
  },
  {
    field: 'isRecommended',
    label: t('cms.article.isRecommended'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.on'), value: false },
        { label: t('common.off'), value: true },
      ],
    },
    required: true,
  },
];
