import IconWatching from '@/components/icons/IconWatching.vue'
import IconPaused from '@/components/icons/IconPaused.vue'
import IconCompleted from '@/components/icons/IconCompleted.vue'
import IconDropped from '@/components/icons/IconDropped.vue'
import IconPlanning from '@/components/icons/IconPlanning.vue'

export default [
  {
    color: '#a4dc6377',
    name: 'completed',
    component: IconCompleted
  },
  {
    color: '#dcbc6377',
    name: 'planning',
    component: IconPlanning
  },
  {
    color: '#63cedc77',
    name: 'watching',
    component: IconWatching
  },
  {
    // color: '#88888877 ',
    color: '#dc848477',
    name: 'dropped',
    component: IconDropped
  },
  {
    color: '#b6cccf77',
    name: 'paused',
    component: IconPaused
  }
]
