
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function usePreviousPathname(): string {
    const pathname = usePathname();

    const [previousPathname, changePreviousPathname] = useState(pathname); 
    const [currentPathname, changeCurrentPathname] = useState(pathname); 

    useEffect(()=> {
        changePreviousPathname(currentPathname);
        changeCurrentPathname(pathname);
    }, [pathname]);

    return previousPathname;

}