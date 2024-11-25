import { useState } from "react";

export function useFetch(callback: ()=>void) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState('')

    const fetching = async () => {
        try {
            setIsLoaded(true)
            await callback()
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setIsLoaded(false)
        }
    }
    return [fetching, isLoaded, error]
}