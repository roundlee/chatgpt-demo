<template>
  <div class="box" :style="{ height: boxHeight+'px' }">
    <div class="chat">
      <MdEdit ref="mdEditRef"/>
    </div>
    <div class="search">
      <a-input v-model:value="text"  class="input-box" @pressEnter="handleInput" placeholder="Ask any technical question..."/>
    </div>
  </div>
</template>

<script>
import MdEdit from './md-edit.vue'
export default {
  name: "chat-vue",
  components:{MdEdit},
  data() {
    return {
      clientHeight: "",
      text:'qqq',
    };
  },
  methods: {
    handleInput(val){
      this.text = ''
      let question = val.srcElement._value
      this.$refs['mdEditRef'].getAnswer(question)
    }
  },
  created() {
    this.clientHeight = `${document.documentElement.clientHeight}`;
    window.onresize = () => {
      return (() => {
        this.clientHeight = document.documentElement.clientHeight;
      })();
    };
  },
  computed: {
    boxHeight: function () {
      return (
        this.clientHeight -
        120 // 
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.box {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 600px;
  background: rgba(0,0,0,1);
  border-radius: 10px;
  .chat{
    width: 100%;
    height: calc(100% - 90px);
    background: rgba(0, 0, 0, 0.2);
    color: #ffffff;
  }
  .search{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90px;
    background: rgba(62, 62, 62,0.6);
    .input-box{
      height: 60px;
      width: 100%;
      margin: 0 20px;
      padding: 10px 16px;
      border-radius: 10px;
      background: rgba(62, 62, 62,0.6);
      color: #ffffff;
    }
  }
}
</style>
