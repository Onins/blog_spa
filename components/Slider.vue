<template>
  <div class="slider">
    <ul class="slider__list" :style="'transform: translateX('+slideTransform+'px)'">
      <li class="slider__list-item" v-for="(slider, index) in this.getSliderPosts" :key="index">
        <div class="slider__image-wrapper" :style="'background-image: url(https://via.placeholder.com/1920x1080); width: '+ getSliderWidth+'px'">
          <div class="slider__wrapper">
            <h2 class="slider__title">
              <span class="slider__title-text"> {{ slider.title }} </span>
            </h2>
            <p class="slider__date">{{ (slider.createdAt).match(/^([\S]+)/g).toString().replace(/[[\]]/g,'') }}</p>
          </div>
        </div>
      </li>  
    </ul>
    <div class="slider__nav">
      <span class="slider__nav-left" @click="doSlide('left')"></span>
      <span class="slider__nav-right" @click="doSlide('right')"></span>
    </div>
    <ul class="slider__pagination">
      <li class="slider__pagination-item" @click="doSlideTo(1)" :class="slideCount == 1 ? 'is-active' : ''"></li>
      <li class="slider__pagination-item" @click="doSlideTo(2)" :class="slideCount == 2 ? 'is-active' : ''"></li>
      <li class="slider__pagination-item" @click="doSlideTo(3)" :class="slideCount == 3 ? 'is-active' : ''"></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('slide', ['getSliderWidth', 'getSliderPosts'])
  },
  data() {
    return {
      slideCount: 1,
      slideTransform: 0,
      totalSlides:  3
    }
  },
  middleware: ['slider'],
  methods: {
    doSlide(data) {
      if(data == "left") {
        if(!this.slideTransform <= 0) { 
          this.slideTransform = this.slideTransform + screen.width;
          this.slideCount--;
        }

      }
      else if (data == "right"){  
        if (this.slideCount != this.totalSlides) {
          this.slideTransform = this.slideTransform - screen.width;
          this.slideCount++;
        }
        // else {
        //   this.slideCount = 1;
        //   this.slideTransform = 0;
        // }
      }
    },
    doSlideTo(data) {
      this.slideTransform = (screen.width * (data - 1)) * -1;
      this.slideCount = data;
    }
  }
  
}
</script>

<style scoped>

</style>
