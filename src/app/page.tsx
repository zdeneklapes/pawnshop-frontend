'use client'
// import Button from '@/components/Button'
import {
  // useCallback,
  // useContext,
  // useDebugValue,
  // useDeferredValue,
  useEffect,
  // useId,
  // useImperativeHandle,
  // useInsertionEffect,
  // useLayoutEffect,
  // useMemo,
  // useReducer,
  useRef,
  useState,
  // useSyncExternalStore,
  // useTransition,
} from 'react'

export function Test1() {
  const [name, setName] = useState('')
  const prevName = useRef('')

  useEffect(() => {
    console.log('mount')
    prevName.current = name
    return () => {
      console.log('unmount')
    }
  }, [name])

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <div>
        My name is {name} and it used to be {prevName.current}
      </div>
    </>
  )
}

export default function Home(): JSX.Element {
  return (
    <>
      <Test1 />
    </>
  )
}
