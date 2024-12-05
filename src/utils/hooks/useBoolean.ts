import { Dispatch, SetStateAction, useCallback, useState } from 'react'

// CUSTOM HOOK FOR HANDLING BOOLEANS. WE CAN USE IT FOR OPENING AND CLOSING MODALS
// IT SAVE FROM LOT OF REPETIVE CODE.
// USAGE:
//   const { value, setValue, setTrue, setFalse, toggle } = useBoolean(false)
// ALSO WE CAN USE FOR MODALS LIKE: 

//   const { value : open, setTrue: openModal, setFalse: closeModal } = useBoolean(false)

interface UseBooleanOutput {
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}

export function useBoolean(defaultValue?: boolean): UseBooleanOutput {
  const [value, setValue] = useState(!!defaultValue)

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue(x => !x), [])

  return { value, setValue, setTrue, setFalse, toggle }
}