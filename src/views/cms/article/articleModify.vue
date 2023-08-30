<template>
  <div class="m-4">
    <Card>
      <BasicForm @register="registerForm" />
    </Card>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { formSchema } from '/@/views/cms/article/article.data';
  import { Card } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    components: { BasicForm, Card },
    setup() {
      // const { createMessage } = useMessage();
      const isUpdate = ref(true);
      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: true,
        submitFunc: submit,
        submitButtonOptions: {
          text: t('common.submit'),
        },
      });

      async function submit(): Promise<void> {
        return new Promise(async function (resolve, reject) {
          const values = await validate();
          console.log(values);
          resolve();
        });
      }

      return {
        registerForm,
      };
    },
  });
</script>
