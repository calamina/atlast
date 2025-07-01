import IconOngoing from '@/components/icons/IconOngoing.vue'
import IconPaused from '@/components/icons/IconPaused.vue'
import IconCompleted from '@/components/icons/IconCompleted.vue'
import IconDropped from '@/components/icons/IconDropped.vue'
import IconPlanning from '@/components/icons/IconPlanning.vue'
import type { StatusModel } from '@/models/status.model'

export const mediaStatus: StatusModel[] = [
  {
    color: '#dcbc6377',
    name: 'planning',
    component: IconPlanning
  },
  {
    color: '#a4dc6377',
    name: 'completed',
    component: IconCompleted
  },
  {
    color: '#63cedc77',
    name: 'ongoing',
    component: IconOngoing
  },
  {
    color: '#b6cccf77',
    name: 'paused',
    component: IconPaused
  },
  {
    color: '#dc848477',
    name: 'dropped',
    component: IconDropped
  },
]