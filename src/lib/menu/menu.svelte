<script>
	import MenuItem from "./menu-item.svelte";
    import { page } from '$app/stores';  

    $: route = $page.url.pathname;
</script>


<ul class="flex flex-col items-center h-fit gap-14">
    <MenuItem active={route === "/"} name="about" route="/"/>
    <MenuItem active={route === "/projects"} name="projects" route="/projects"/>
    <MenuItem active={route === "/blog"} name="blog" route="/blog"/>
    <MenuItem active={route === "/contact"} name="contact" route="/contact"/>
</ul>