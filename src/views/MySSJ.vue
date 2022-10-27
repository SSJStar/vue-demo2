<template>
  <div style="background-color: #42b983; width: 100%; height: 100%">
    <h1>我自己的页面</h1>
    <button @click="btnClick">来点我啊</button>
  </div>
</template>

<script>
export default {
  name: "MyPage",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  methods: {
    btnClick() {
      // print('btnClick执行')
      alert("有啥事儿？" + this.msg);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
