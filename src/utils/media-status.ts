import IconOngoing from '@/components/icons/IconOngoing.vue'
import IconPaused from '@/components/icons/IconPaused.vue'
import IconCompleted from '@/components/icons/IconCompleted.vue'
import IconDropped from '@/components/icons/IconDropped.vue'
import IconPlanning from '@/components/icons/IconPlanning.vue'
import type { StatusModel } from '@/models/status.model'

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
    name: 'ongoing',
    component: IconOngoing
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
] as StatusModel[]
