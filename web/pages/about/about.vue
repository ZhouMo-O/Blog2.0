<template>
  <div>
    <v-img src="./aboutMe.png" class="articleTopCard">
      <h2 class="text-center">关于</h2>
    </v-img>
    <v-container id="cardIndex">
      <v-card class="aboutMeIndex">
        <v-subheader :key="aboutBlog">{{ aboutBlog }}</v-subheader>
        <v-divider> </v-divider>
        <p>
          这是我的第二版博客，相对于第一版，进步是有的，所有的功能点都是自己自主开发的。
        </p>
        <p>
          但是因为工作的原因更新的断断续续，距离我预想的开源还是有一定距离的，完全开源算是自己今年的小目标吧。
        </p>
        <p>
          为什么我要如此执着于个人博客和开源呢？因为我是一个从零开始学习前端的开发人员，
          资源都是通过网上学习的，并且个人博客这个项目虽然看起来没有特别的难。
        </p>
        <p>
          但是要真正做下来就会发现项目上限很高，要做的东西特别的多，
          涉及的知识面非常的广泛。并且只要你愿意可以深入某一方面钻研，找到自己的兴趣和爱好，发挥自己的特长，比如SEO、数据统计、界面交互和设计、系统运维等等。
          一开始可能都会很简陋，但是会越做越深入，越做越好，渐入佳境应该就是这种感觉吧。
        </p>
        <v-subheader :key="aboutMe">{{ aboutMe }}</v-subheader>
        <v-divider> </v-divider>
        <p>
          一个代码不抽象，但是人和抽象的前端选手，欢迎各位加我微信交流（请备注来自Starry）。
        </p>
        <v-img class="wechat"></v-img>
        <p class="lifeCode">邀约峡谷微风，对饮山间清泉</p>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aboutMe: "关于我",
      aboutBlog: "关于博客"
    };
  }
};
</script>

<style lang="scss" scoped>
.articleTopCard {
  width: 100vw;
  height: 38vh;
  background: #4f7da4;
  /* border: 1px solid red !important; */
  background: url("./aboutMe.png");
  background-size: cover;
}

h2 {
  text-align: center;
  padding-top: 15vh;
  color: white;
}

.aboutMeIndex {
  line-height: 1.5;
  padding: 15px;
  .wechat {
    width: 150px;
    height: 150px;
    background: url("./wechat.png") no-repeat;
    background-size: 150px 150px;
  }
  .lifeCode {
    text-align: center;
  }
}
</style>
