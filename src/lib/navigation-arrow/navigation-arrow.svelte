<script lang="ts">
    import { page } from '$app/stores';  

    export let direction: "right" | "left";
    
    const routerArray = ["/", "/projects", "/blog", "/contact"];
    
    $: route = $page.url.pathname;
    const navigateNext = () => {
        const currentRouteIndex = routerArray.findIndex(currentRoute => currentRoute === route);
        if(currentRouteIndex === -1) {
            throw new Error("could not find next route");
        }

    }
</script>


<div class="bg-primary w-11 h-11">
    >
</div>