<template>
  <div>
    <table border="1" borderColor="#ccc" cellspacing="0">
      <tr>
        <td class="td">
          <h3>共{{ total }}条记录</h3>
          <el-button type="primary" round @click="showsAdd = true">+添加面经</el-button>
        </td>
      </tr>
      <tr>
        <td class="td2">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="stem" label="标题" width="180" />
            <el-table-column prop="creator" label="作者" width="180" />
            <el-table-column prop="likeCount" label="点赞" />
            <el-table-column prop="views" label="浏览数" />
            <el-table-column prop="createdAt" label="更新时间" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-icon @click="show(scope.row.id)"><View /></el-icon>
                <el-icon @click="emitData(scope.row)"><EditPen /></el-icon>
                <el-icon @click="del(scope.row.id)"><Delete /></el-icon>
              </template>
            </el-table-column>
          </el-table>
          <br />
          <el-pagination small background layout="prev, pager, next" :total="total" class="mt-4" @current-change="handleCurrentChange" />
        </td>
      </tr>
    </table>

    <el-drawer v-model="drawer" title="预览面经" :direction="direction" :before-close="handleClose">
      <h1>{{ detail.stem }}</h1>
      <div v-html="detail.content"></div>
    </el-drawer>
    <!-- 添加 -->
    <el-drawer v-model="showsAdd" title="添加面经" :direction="direction" :before-close="handleClose" style="width: 45% !important">
      <el-form :model="form" :rules="rules" :inline="true" label-position="right" ref="forms" label-width="100px" class="form">
        <el-form-item label="标题" prop="username">
          <el-input v-model="form.stem"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="username">
          <quill-editor v-model:content="form.content" contentType="html"></quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addData">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 编辑 -->
    <el-drawer v-model="showsAdd1" title="编辑面经111" :direction="direction" :before-close="handleClose" style="width: 45% !important">
      <el-form :model="form1" :rules="rules1" :inline="true" label-position="right" ref="forms1" label-width="100px" class="form">
        <el-form-item label="标题" prop="username">
          <el-input v-model="form1.stem"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="username">
          <quill-editor v-model:content="form1.content" contentType="html"></quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="emit">确认</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { queryApi, showApi, delApi, addApi, emitApi } from '../utils/api';
import { ElMessage, ElMessageBox } from 'element-plus';
import { View, Delete, EditPen } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';

const total = ref('');
const tableData = ref([]);
const pageInfo = reactive({
  current: 1,
  pageSize: 5,
});
const query = () => {
  queryApi(pageInfo).then((res: any) => {
    console.log(res, '面经数据');
    total.value = res.data.total;
    tableData.value = res.data.rows;
  });
};
query();

const handleCurrentChange = (val: number) => {
  pageInfo.current = val;
  query();
};

const drawer = ref(false);
const showsAdd = ref(false);
const showsAdd1 = ref(false);
const direction = ref('rtl');
const detail = ref<{ stem: string; content: string }>({
  stem: '',
  content: '',
});
const show = (id: string) => {
  drawer.value = true;
  showApi({ id: id }).then((res) => {
    console.log(res, '预览');
    detail.value = res.data;
  });
};
const handleClose = (done: () => void) => {
  done();
};
const del = (id: string) => {
  console.log(id);

  delApi({ id: id })
    .then((res) => {
      console.log(res, '删除');
      ElMessage.success('删除成功');
    })
    .catch((err) => {
      console.log(err);
    });
};

interface RuleForm {
  stem: string;
  content: string;
}
interface RuleForm1 {
  id: string;
  stem: string;
  content: string;
}

const forms = ref<FormInstance>();
const forms1 = ref<FormInstance>();
const form = reactive<RuleForm>({
  stem: '',
  content: '',
});
const form1 = reactive<RuleForm1>({
  id: '',
  stem: '',
  content: '',
});

const rules = reactive<FormRules<RuleForm>>({});
const rules1 = reactive<FormRules<RuleForm1>>({
  stem: [
    {
      required: true,
      message: '面经标题不能为空',
      trigger: 'blur',
    },
  ],
  content: [{ required: true, message: '内容不能为空', trigger: 'blur' }],
});

const addData = () => {
  addApi(form)
    .then((res) => {
      console.log(res);
      query();
    })
    .catch((err) => {
      console.log(err);
    });
  form.stem = '';
  form.content = '';
};

const emitData = (row: RuleForm1) => {
  form1.id = row.id;
  form1.content = row.content;
  form1.stem = row.stem;
  showsAdd1.value = true;
};
const emit = () => {
  emitApi(form1).then((res) => {
    console.log(res, '编辑');
    query();
  });
  showsAdd1.value = false;
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;

  td {
    padding: 10px;
    box-sizing: border-box;
  }
  .td {
    display: flex;
    justify-content: space-between;
  }

  .td2 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
