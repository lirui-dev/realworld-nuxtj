import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('dayjs', (value, format = 'MMMM D, YYYY') => {
  return dayjs(value).format(format)
})