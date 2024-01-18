<script lang="ts">
	import clsx from "clsx";
    export let name: string;
    export let route: string;
    export let active: boolean;
</script>

<li class="flex-1 flex gap-1 h-full cursor-pointer">
    <a href={route} class={clsx("[writing-mode:vertical-rl] rotate-180 transition-all hover:text-text/80", active ? "font-bold" : "")}>
        {name}
    </a>
    {#if active}
        <div class="w-[2px] h-auto bg-primary"></div>
    {:else}
        <div class="w-[2px] h-auto bg-primary/0"></div>
    {/if}
</li>