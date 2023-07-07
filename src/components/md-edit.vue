<template>
  <div class="editor" ref="editorRef">
    <div class="empty">
      <div style="margin-left:200px">chat with me</div>
      <delete-outlined
        :style="{ fontSize: '18px' }"
        class="icons"
        @click="handleDel"
      />
    </div>
    <div v-for="(item, index) in question" :key="index">
      <MdPreview
        :editorId="questionId"
        :modelValue="item"
        theme="dark"
        :class="'item' + index"
      />
      <MdPreview :editorId="id" :modelValue="text[index]" theme="dark" />
    </div>
    <!-- <MdCatalog :editorId="id" :scrollElement="scrollElement" /> -->
    <div class="tip-box" v-if="overFlag">加载中...</div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import DeleteOutlined from "@ant-design/icons-vue/DeleteOutlined";
import ExclamationCircleOutlined from "@ant-design/icons-vue/ExclamationCircleOutlined";
import { createVNode } from "vue";
import { Modal } from "ant-design-vue";
import axios from "axios";

const id = "preview-only";
const questionId = "question-only";

const question = ref([]);
const text = ref([]);
const editorRef = ref();
const overFlag = ref(false);
// '下面是一个简单的Java示例，演示了如何实现两个数的加法：\n\n```java\npublic class Addition {\n    public static void main(String[] args) {\n        int num1 = 5;\n        int num2 = 10;\n        int sum = add(num1, num2);\n        System.out.println("The sum of " + num1 + " and " + num2 + " is " + sum);\n    }\n    \n    public static int add(int a, int b) {\n        return a + b;\n    }\n}\n```\n\n运行以上代码，输出结果为：\n\n```\nThe sum of 5 and 10 is 15\n```\n\n这个Java示例定义了一个名为`Addition`的公共类。`main`方法是程序入口，首先定义了两个整数变量`num1`和`num2`，分别赋值为5和10。然后调用`add`方法，传入这两个变量作为参数，返回值被赋给`sum`变量。最后，使用`System.out.println`方法将结果打印到控制台。`add`方法是一个静态方法，用于对两个整数进行加法运算，并返回结果。',

// 请求回答接口
const getAnswer = (data) => {
  question.value.push(data);
  setTimeout(handleScoll, 200);
  overFlag.value = true;
  let params = {
    content: data,
  };
  axios
    .get(
      "http://192.168.31.193:8080/api/requestGpt",
      { params },
      { timeout: 0 }
    )
    .then((res) => {
      text.value.push(res.data);
      overFlag.value = false;
    })
    .catch((e) => {
      console.log(e);
      overFlag.value = false;
    });
};

// 滚动到 当前提问处
const handleScoll = () => {
  let itemClass = document.getElementsByClassName(
    "item" + (question.value.length - 1)
  );
  console.log(itemClass, "...");
  editorRef.value.scrollTo({
    top: itemClass[0].offsetTop - 100,
    behavior: "smooth",
  });
};

defineExpose({
  getAnswer,
});

// const scrollElement = document.documentElement;
const handleDel = () => {
  Modal.confirm({
    title: "删除会话",
    icon: createVNode(ExclamationCircleOutlined),
    content:
      "这将删除此工作区中所有用户的会话及其内容。您确定要删除吗？此操作无法撤销。",
    onOk() {
      return new Promise((resolve, reject) => {
        text.value = [];
        question.value = [];
        setTimeout(text.value.length > 0 ? reject : resolve, 200);
      }).catch(() => console.log("删除失败！"));
    },
    onCancel() {},
  });
};
</script>
<style lang="less" scoped>
.editor {
  height: 100%;
  overflow: scroll;
  position: relative;
  //   background: blue;
  .empty {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 30px;
    background: rgba(71, 74, 76, 0.5);
    text-align: left;
    padding-left: 40px;
    .icons {
      margin-right: 20px;
      cursor: pointer;
      &:hover {
        color: rgb(201, 2, 2);
      }
    }
  }
  .tip-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 40px;
    // box-shadow:1px 1px 1px #656464;
    position: fixed;
    bottom: 155px;
    left: 300px;
    background: rgba(71, 74, 76, 0.8);
  }
}
/deep/ .md-editor-dark article.default-theme {
  text-align: left;
  color: #ffffff;
  background: rgb(71, 74, 76);
  padding: 10px;
  margin-top: 30px;
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
  font-size: 14px;
  border-radius: 4px;
  //   position: relative;
}
/deep/ .md-editor-dark article#preview-only-preview::before {
  content: "Answer :";
  color: #ffffff;
  position: absolute;
  left: 25px;
  top: 10px;
}
/deep/ .md-editor-dark article#question-only-preview::before {
  content: "question :";
  color: #ffffff;
  position: absolute;
  left: 25px;
  top: 10px;
}
</style>
