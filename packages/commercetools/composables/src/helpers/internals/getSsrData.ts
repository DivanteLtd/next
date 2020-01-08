import { SsrContext } from 'composables/src/types/SSR';

export default function<T>(ssrContext: SsrContext<T> | undefined | null): T | null {
  return ssrContext !== undefined
    ? ssrContext.nuxt.data[0]
    : null
}
