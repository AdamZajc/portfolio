'use client'

export default function useWindow() {
        const width = window.innerWidth
        const height = window.innerHeight
        const scrollY = window.scrollY
        const location = window.location.href

        return {
            dimensions: { width: width, height: height },
            scroll: scrollY,
            href: location
        }
}