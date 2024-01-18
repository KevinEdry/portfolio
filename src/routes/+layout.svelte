<script lang="ts">
    import "../app.css";
    import Typewriter from 'svelte-typewriter'
	import Menu from "$lib/menu/menu.svelte";
    import HeroTitle from "$lib/hero-title/hero-title.svelte";
    import NavigationArrow from "$lib/navigation-arrow/navigation-arrow.svelte";
</script>

<div class="flex flex-row font-roboto min-h-full h-full bg-hero bg-cover text-text overflow-hidden">
    <nav class="flex flex-col w-1/12 h-full justify-center pb-10">
        <Menu />
    </nav>
    <main class="flex flex-col w-full h-full">
        <section class="h-1/6 flex items-center w-full">
            <Typewriter mode="loop" cursor={false} interval={100}>
                <HeroTitle>Hello, I'm Kevin 👋.</HeroTitle>
                <HeroTitle>नमस्ते, मैं केविन हूं। 🙏</HeroTitle>
                <HeroTitle>你好，我是凯文 🙌。</HeroTitle>
                <HeroTitle>Hola, soy Kevin ✨.</HeroTitle>
                <HeroTitle>こんにちは、ケビンです ✌️。</HeroTitle>
                <HeroTitle>אהלן, אני קווין 👌.</HeroTitle>
            </Typewriter>
        </section>
        <slot></slot>
    </main>
    <div class="flex flex-col absolute right-0 bottom-32">
        <NavigationArrow direction="right"/>
        <NavigationArrow direction="left"/>
    </div>
</div>