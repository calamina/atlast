import type { Component } from "vue"

export type CategNameModel = 'movie' | 'series' | 'book' | 'comic' | 'game' | null

export interface CategModel {
  color: string,
  name: CategNameModel,
  component: Component
}