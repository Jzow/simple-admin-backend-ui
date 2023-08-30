<template>
  <div class="m-4">
    <Card>
      <BasicForm @register="registerForm" />
    </Card>
  </div>
</template>
<script lang="ts">
  import { defineComponent, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from '/@/views/cms/article/article.data';
  import { Card } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useRouter } from 'vue-router';
  import { createArticle, getArticleById, updateArticle } from '/@/api/cms/article';
  import { onMounted } from 'vue';
  import { ZERO_UUID } from '/@/enums/commonEnum';

  export default defineComponent({
    components: { BasicForm, Card },
    setup() {
      const { currentRoute } = useRouter();
      const articleId = unref(currentRoute).params.articleId;
      const { t } = useI18n();

      const [registerForm, { setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: true,
        submitFunc: submit,
        submitButtonOptions: {
          text: t('common.submit'),
        },
      });

      onMounted(async () => {
        if (articleId != ZERO_UUID) {
          const result = await getArticleById({ id: articleId as string });
          if (result.code == 0) {
            setFieldsValue(result.data);
          }
        }
      });

      async function submit(): Promise<void> {
        return new Promise(async function (resolve, reject) {
          const values = await validate();
          values['id'] = articleId;
          console.log(values);
          let result =
            values['id'] != ZERO_UUID ? await updateArticle(values) : await createArticle(values);
          console.log(result);
          resolve();
        });
      }

      return {
        registerForm,
      };
    },
  });
</script>
