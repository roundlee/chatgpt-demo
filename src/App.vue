<template>
  <ChatArea />
</template>

<script>
import ChatArea from './components/chat-area.vue'

export default {
  name: 'App',
  components: {
    ChatArea
  }
}
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background: url('./assets/bg.jpg') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
}
#app {
  display: flex;
  justify-content: center;
  margin-left: 200px;
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
