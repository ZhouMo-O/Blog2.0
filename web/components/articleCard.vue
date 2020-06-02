<template>
  <v-container id="cardIndex">
    <v-row>
      <v-col :sm="6" :md="4" :lg="3" v-for="n in 12" :key="n" id="articleCard">
        <v-hover close-delay="50">
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 2 : 10"
              class="mx-auto"
              max-width="350"
              max-height="380"
            >
              <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title>Top 10 Australian beaches</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">Number 10</v-card-subtitle>

              <v-card-text class="text--primary">
                <div>Whitehaven Beach</div>

                <div>Whitsunday Island, Whitsunday Islands</div>
              </v-card-text>

              <v-card-actions>
                <v-btn color="orange" text>Share</v-btn>

                <v-btn color="orange" text>Explore</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    overlay: false
  })
};
</script>

<style scoped>
@media screen and (min-width: 1500px) {
  #cardIndex {
    max-width: 1450px;
  }
}
</style>
