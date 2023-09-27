import IconBook from '@/components/icons/IconBook.vue'
import IconPaused from '@/components/icons/IconPaused.vue'
import IconCompleted from '@/components/icons/IconCompleted.vue'
import IconDropped from '@/components/icons/IconDropped.vue'
import IconPlanning from '@/components/icons/IconPlanning.vue'

export default [
  {
    color: '#a4dc6366',
    name: 'movie',
    component: IconCompleted
  },
  {
    color: '#dca86366',
    name: 'series',
    component: IconPlanning
  },
  {
    color: '#63cedc66',
    name: 'book',
    component: IconBook
  },
  {
    color: '#88888866',
    name: 'comic',
    component: IconDropped
  },
  {
    color: '#b6cccf66',
    name: 'game',
    component: IconPaused
  }
]
