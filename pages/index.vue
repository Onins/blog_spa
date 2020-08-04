<template>
  <div>
    <Slider />
    <News />
  </div>
</template>

<script>
import Slider from '~/components/Slider.vue'
import News from '~/components/News.vue'

export default {
  components: {
    Slider,
    News
  }
}
</script>

