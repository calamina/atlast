import type { Component } from "vue";

export type StatusNameModel = "completed" | "planning" | "ongoing" | "dropped" | "paused" | null


export interface StatusModel {
  color: string,
  name: StatusNameModel,
  component: Component
}