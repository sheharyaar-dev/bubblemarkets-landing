import { Component, type ReactNode } from 'react'

/** Anything that goes wrong inside the 3D scene falls back to `fallback` instead of blanking the page. */
export default class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err: unknown) {
    console.warn('[BubbleScene] 3D disabled, using static fallback:', err)
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
