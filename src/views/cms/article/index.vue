<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <Button
          type="primary"
          danger
          preIcon="ant-design:delete-outlined"
          v-if="showDeleteButton"
          @click="handleBatchDelete()"
        >
          {{ t('common.delete') }}
        </Button>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">
          {{ t('cms.article.addArticle') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: t('common.deleteConfirm'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { createVNode, defineComponent, ref } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib/icons';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { Button } from '/@/components/Button';

  import { useI18n } from 'vue-i18n';

  import { columns, searchFormSchema } from './article.data';
  import { getArticleList, deleteArticle } from '/@/api/cms/article';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'ArticleManagement',
    components: { BasicTable, TableAction, Button },
    setup() {
      const { t } = useI18n();
      const selectedIds = ref<number[] | string[]>();
      const showDeleteButton = ref<boolean>(false);
      const go = useGo();

      const [registerTable, { reload }] = useTable({
        title: t('cms.article.articleList'),
        api: getArticleList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        clickToRowSelect: false,
        actionColumn: {
          width: 30,
          title: t('common.action'),
          dataIndex: 'action',
          fixed: undefined,
        },
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          onChange: (selectedRowKeys, _selectedRows) => {
            selectedIds.value = selectedRowKeys as string[];
            showDeleteButton.value = selectedRowKeys.length > 0;
          },
        },
      });

      function handleCreate() {
        go('/cms/article/modify/' + '00000000-0000-0000-0000-000000000000');
      }

      function handleEdit(record: Recordable) {
        go('/cms/article/modify/' + record.id);
      }

      async function handleDelete(record: Recordable) {
        const result = await deleteArticle({ ids: [record.id] });
        if (result.code === 0) {
          await reload();
        }
      }

      async function handleBatchDelete() {
        Modal.confirm({
          title: t('common.deleteConfirm'),
          icon: createVNode(ExclamationCircleOutlined),
          async onOk() {
            const result = await deleteArticle({ ids: selectedIds.value as string[] });
            if (result.code === 0) {
              showDeleteButton.value = false;
              await reload();
            }
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

      async function handleSuccess() {
        await reload();
      }

      return {
        t,
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleBatchDelete,
        showDeleteButton,
      };
    },
  });
</script>
