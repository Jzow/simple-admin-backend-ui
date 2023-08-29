import { Switch } from 'ant-design-vue';
import { updateCategory } from '/@/api/cms/category';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('cms.category.title'),
    dataIndex: 'title',
    width: 50,
  },
  {
    title: t('common.status'),
    dataIndex: 'state',
    width: 20,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.state === true,
        checkedChildren: t('common.on'),
        unCheckedChildren: t('common.off'),
        loading: record.pendingStatus,
        onChange(checked, _) {
          record.pendingStatus = true;
          const newState = checked ? true : false;
          updateCategory({ id: record.id, state: newState })
            .then(() => {
              record.state = newState;
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: t('cms.category.sort'),
    dataIndex: 'sort',
    width: 20,
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 40,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: t('cms.category.title'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'shortTitle',
    label: t('cms.category.shortTitle'),
    component: 'Input',
    colProps: { span: 8 },
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
    label: t('cms.category.title'),
    component: 'Input',
    required: true,
  },
  {
    field: 'shortTitle',
    label: t('cms.category.shortTitle'),
    component: 'Input',
    required: true,
  },
  {
    field: 'state',
    label: t('cms.category.state'),
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
  {
    field: 'sort',
    label: t('cms.category.sort'),
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'banner',
    label: t('cms.category.banner'),
    component: 'Input',
    required: true,
  },
  {
    field: 'description',
    label: t('cms.category.description'),
    component: 'Input',
    required: true,
  },
  {
    field: 'isLeaf',
    label: t('cms.category.isLeaf'),
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
  {
    field: 'parentId',
    label: t('cms.category.parentId'),
    component: 'InputNumber',
    required: true,
  },
];
