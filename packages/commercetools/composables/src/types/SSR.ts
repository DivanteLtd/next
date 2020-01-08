export interface SsrContext<T = {}> {
  nuxt: {
    data: [T]
  }
}