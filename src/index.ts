import { useReducer } from 'react'
import { watch } from 'vue'


export function useReactive(renderFun: () => JSX.Element | null) {
  let [_, forceUpdate] = useReducer((x) => x + 1, 0)

  let renderered = false;

  let reslut: JSX.Element | null = null
  watch(
    () => {
      if (renderered)
        return
      renderered = true
      reslut = renderFun()
    },
    () => {
      forceUpdate()
      // console.log('forceUpdate')
    }, { deep: true, flush: "post", once: true }
  )

  return reslut
}