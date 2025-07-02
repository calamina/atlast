import type { Component } from "vue"

export type CategNameModel = 'movies' | 'series' | 'books' | 'comics' | 'games' | null
export type CategNameSingleModel = 'movie' | 'series' | 'book' | 'comic' | 'game' | null

export interface CategModel {
  color: string,
  name: CategNameModel,
  single: CategNameSingleModel,
  component: Component
}