<template>
  <div>
    <Breadcrumbs/>
    <!-- <Content/>
    <Comment/> -->
  </div>
</template>

<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue'
import { createNamespacedHelpers } from 'vuex'
import axios from 'axios'

const { mapGetters, mapMutations } = createNamespacedHelpers('news')

export default {
  computed: {
    ...mapGetters(['getNewsSelect'])
  },
  components: {
    Breadcrumbs
  }
}
</script>

