import React from "react"

export const useLocalStorageState = (key, defaultValue = '') => {

    const [name, setName] = React.useState(
      // Lazy initialization
      () => {
        const valueInLocalStorage = window.localStorage.getItem(key)
        if (valueInLocalStorage) {
          return JSON.parse(valueInLocalStorage)
        }
        // Adding the ability to set the default value to a function
        // To avoid a computationally expensive function being created at every render
        return typeof defaultValue === 'function' ? defaultValue() : defaultValue
      })

      // Keep track of the previous key value through the entire lifecycle of the component:
      const prevKeyRef = React.useRef(key)

    React.useEffect(() => {
      const prevKey = prevKeyRef.current
      if (prevKey !== key) {
        window.localStorage.removeItem(key)
      }
      prevKeyRef.current = key
      window.localStorage.setItem(key, JSON.stringify(name))
    }, [key, name])

    function handleChange(event) {
      setName(event.target.value)
    }

    return {
        name,
        handleChange
    }
}