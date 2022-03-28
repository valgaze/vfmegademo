<template>
  <section
    class="nes-container with-title wrap"
    :class="{ 'is-dark': darkmode }"
    @click="componentTap"
  >
    <span class="title">{{ data.title }}</span>
    <div class="subtitle">{{ data.subtitle }}</div>


      <i class="nes-icon is-large" :class="{[checker()]:checker()}"></i>

    <div
      class="text"
      v-if="data.formattedText"
      v-html="markdownify(data.formattedText)"
    ></div>
    <div
      class="text"
      v-else-if="data.text"
      v-html="markdownify(data.text)"
    ></div>
    <!-- Buttons -->
    <slot />
    <!---->
    <!---->
    <div class="footer">{{ data.footer }}</div>
  </section>
</template>

<script>
import showdown from "showdown";
export default {
  name: "card",
  mounted() {},

  data() {
    return {
      showdownRef: new showdown.Converter(),
    };
  },
  methods: {
    checker() {
      // const validIconRoster = [ "checklist","checklist_fade","close","close_fade","document","document_fade","engineer","engineer_fade","gear","gear_fade","group","group_fade","lock","lock_fade","question","question_fade","ribbon","ribbon_fade","toolbox","toolbox_fade","tree","tree_fade","warn","warn_fade","wrench","wrench_fade"]
      const frameworkIcons = ["heart", "star", "like", "twitter", "facebook", "instagram", "github", "google", "gmail","medium","linkedin","twitch","youtube","whatsapp", "trophy","coin"]
      const res = Math.floor(Math.random()*frameworkIcons.length)
      console.log(frameworkIcons[res])
      return frameworkIcons[res]
    },

    componentTap() {
      this.$emit("componentTap", {
        origin: "component",
        data: this.data.title,
      });
    },
  },
  props: {
    data: Object,
    image_url: String,
    image_alttext: String,
    darkmode: Boolean,
  },
};
</script>

<style scoped>
.card-image {
  max-width: 50%;
  height: auto;
}
.wrap {
  margin-bottom: 1%;
}

section:hover {
  cursor: pointer;
}
</style>
