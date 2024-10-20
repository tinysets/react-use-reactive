import { MutableRefObject, useReducer, useRef } from 'react'
import { watch, WatchHandle } from 'vue'
export function useReactive(renderFun: () => JSX.Element | null) {
  let ref = useRef(null) as any as MutableRefObject<WatchHandle | null>
  let [_, forceUpdate] = useReducer((x) => x + 1, 0)

  let renderered = false;
  let reslut: JSX.Element | null = null
  let stop = watch(
    () => {
      if (renderered)
        return
      renderered = true
      reslut = renderFun()
    },
    () => {
      forceUpdate()
      // console.log('forceUpdate')
      if (ref.current == stop) {
        ref.current = null
      }
    }, { deep: true, flush: "post", once: true }
  )
  if (ref.current) {
    ref.current.stop();
  }
  ref.current = stop

  return reslut
}