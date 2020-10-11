<template>
  <div>
    <!-- <v-card>111 <v-overlay :absolute="absolute"> </v-overlay></v-card> -->
    <v-card>
      <v-img
        class="indexCard"
        src="https://xiaowublog1.oss-cn-shanghai.aliyuncs.com/starry.jpg"
        aspect-ratio="1.7"
      >
        <transition name="fade">
          <div v-if="show" class="greet">
            <h1>周末的个人博客</h1>
            <h5 class="">脚踏实地，仰望星空</h5>
          </div>
        </transition></v-img
      >
    </v-card>
    <articleCard></articleCard>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import articleCard from "~/components/articleCard.vue";
export default {
  data() {
    return {
      show: false
    };
  },
  mmethods: {},
  components: {
    Logo,
    articleCard
  },
  mounted() {
    this.show = true;
  }
};
</script>

<style lang="scss" scoped>
.indexCard {
  $border-color: #f90;
  // background: url("https://xiaowublog1.oss-cn-shanghai.aliyuncs.com/starry.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  color: white;
  .greet {
    // border: 1px solid $border-color;
    margin: 0 auto;
    text-align: center;
    padding: 35vh 0;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
