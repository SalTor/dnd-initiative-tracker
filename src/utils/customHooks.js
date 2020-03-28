import { useState, useEffect } from 'react'

export const useSessionStorageState = (initialState, stateId) => {
    const existingState = JSON.parse(sessionStorage.getItem(stateId))
    const [state, setState] = useState(existingState || initialState)

    // Persist all formState changes to localStorage
    useEffect(() => {
        sessionStorage.setItem(stateId, JSON.stringify(state))
    }, [state, stateId])

    return [state, setState]
}
