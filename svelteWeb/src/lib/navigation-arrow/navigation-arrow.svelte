<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import Arrow from '$lib/icons/arrow.svelte';
	import clsx from 'clsx';

    export let direction: "right" | "left";
    
    const routerArray = ["/", "/projects", "/blog", "/contact"];
    
    $: route = $page.url.pathname;
    const navigate = () => {
        const navigationDirection = direction === "right" ? 1 : -1;
        const currentRouteIndex = routerArray.findIndex(currentRoute => currentRoute === route);
        if(currentRouteIndex === -1) {
            throw new Error("could not find next route");
        }

        const nextRouteIndex = currentRouteIndex + navigationDirection;
        goto(routerArray[nextRouteIndex >= routerArray.length ? 0 : nextRouteIndex < 0 ? routerArray.length -1 : nextRouteIndex]);
    }
</script>


<button type="button" class={clsx("bg-primary flex justify-center items-center w-11 h-11 hover:bg-primary/85", direction === "left" && "rotate-180" )} on:click={()=>navigate()}>
    <Arrow />
</button>