import { useState, useEffect } from 'react'

export const useIntersection = (element: React.RefObject<Element>, rootMargin: string) => {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setState(entry.isIntersecting);
            }, { rootMargin }
        );

        element && observer.observe(element.current!);

        return () => observer.unobserve(element.current!);
    }, []);

    return isVisible;
};