<script lang="ts">
	import clsx from "clsx";
    export let name: string;
    export let route: string;
    export let active: boolean;
</script>

<li class="flex-1 flex h-full cursor-pointer">
    <a href={route} class={clsx("[writing-mode:vertical-rl] rotate-180", active ? "font-bold" : "")}>
        {name}
    </a>
    {#if active}
        <div class="w-[2px] h-auto bg-primary"></div>
    {/if}
</li>