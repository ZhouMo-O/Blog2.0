<template>
  <div>
    <v-snackbar
      id="message"
      v-model="snackbar"
      :color="'success'"
      :multi-line="'multi-line'"
      :timeout="timeout"
      :top="'top'"
    >
      {{ text }}
      <template>
        <v-btn dark text @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: this.$store.state.mode,
      snackbar: this.$store.state.model,
      text: "",
      timeout: 6000,
      valid: true
    };
  },
  methods: {}
};
</script>

<style></style>
