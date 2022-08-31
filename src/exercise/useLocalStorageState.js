import React from "react"

export const useLocalStorageState = (key, defaultValue = '') => {
    const [name, setName] = React.useState(() => window.localStorage.getItem(key) ?? defaultValue)

    React.useEffect(() => {
      window.localStorage.setItem(key, name)
    }, [key, name])

    function handleChange(event) {
      setName(event.target.value)
    }

    return {
        name,
        handleChange
    }
}