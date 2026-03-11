"use client"

import { useEffect } from "react"

export default function useClickOutside(ref: any, handler: () => void) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!ref.current) return

      if (!ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener("mousedown", handleClick)

    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [ref, handler])
}