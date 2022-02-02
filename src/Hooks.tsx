import { useState, useEffect } from 'react'
import { getWindowDimensions } from './Helpers';

export const useIntersection = (element: React.RefObject<Element>, rootMargin: string) => {
    const [visible, setVisible] = useState(false);

    const callbkFunc = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        setVisible(entry.isIntersecting);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callbkFunc, {rootMargin});
        element && observer.observe(element.current!);

        return () => {
            element && observer.unobserve(element.current!);
        }
    }, [visible]);

    return visible;
};
