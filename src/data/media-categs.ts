import IconBook from '@/components/icons/IconBook.vue'
import IconMovie from '@/components/icons/IconMovie.vue'
import IconSeries from '@/components/icons/IconSeries.vue'
import IconComic from '@/components/icons/IconComic.vue'
import IconGame from '@/components/icons/IconGame.vue'
import type { CategModel } from '@/models/categ.model'

export const mediaCategs: CategModel[] = [
  {
    color: '#a4dc6366',
    name: 'movie',
    component: IconMovie
  },
  {
    color: '#dca86366',
    name: 'series',
    component: IconSeries
  },
  {
    color: '#63cedc66',
    name: 'book',
    component: IconBook
  },
  {
    color: '#88888866',
    name: 'comic',
    component: IconComic
  },
  {
    color: '#b6cccf66',
    name: 'game',
    component: IconGame
  }
] 