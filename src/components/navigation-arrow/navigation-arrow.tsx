"use client";

import clsx from 'clsx';
import { useRouter, usePathname } from 'next/navigation';
import ArrowIcon from '~/public/icons/arrow.svg';

export default function NavigationArrow(props: { direction: "right" | "left" }) {
    const router = useRouter()
    const route = usePathname();
    const { direction } = props;

    const routerArray = ["/", "/projects", "/blog", "/contact"];

    const navigate = () => {
        const navigationDirection = direction === "right" ? 1 : -1;
        const currentRouteIndex = routerArray.findIndex(currentRoute => currentRoute === route);
        if(currentRouteIndex === -1) {
            throw new Error("could not find next route");
        }
        
        const nextRouteIndex = currentRouteIndex + navigationDirection;
        const routeIndex = nextRouteIndex >= routerArray.length ? 0 : nextRouteIndex < 0 ? routerArray.length -1 : nextRouteIndex;
        const nextPathname = routerArray[routeIndex];
        
        if(nextPathname == null) {
            throw new Error("could not find next route");
        }
        router.push(nextPathname);
    }

  return (
    <button type="button" className={clsx("bg-primary flex justify-center items-center w-11 h-11 hover:bg-primary/85", direction === "left" && "rotate-180" )} onClick={()=>navigate()}>
        <ArrowIcon />
    </button>

  );
}

