<script lang="ts">
    import "../app.css";
    import Typewriter from 'svelte-typewriter'
	import Menu from "$lib/menu/menu.svelte";
    import HeroTitle from "$lib/hero-title/hero-title.svelte";
</script>

<div class="flex flex-row font-roboto min-h-full h-full bg-hero bg-cover text-text">
    <nav class="flex flex-col w-1/12 h-full justify-center pb-10">
        <Menu />
    </nav>
    <section class="flex flex-col w-full h-full">
        <div class="h-1/4 flex items-center w-full">
            <Typewriter mode="loop" cursor={false} interval={100}>
                <HeroTitle>Hello, I'm Kevin 👋.</HeroTitle>
                <HeroTitle>नमस्ते, मैं केविन हूं। 🙏</HeroTitle>
                <HeroTitle>你好，我是凯文 🙌。</HeroTitle>
                <HeroTitle>Hola, soy Kevin ✨.</HeroTitle>
                <HeroTitle>こんにちは、ケビンです ✌️。</HeroTitle>
                <HeroTitle>אהלן, אני קווין 👌.</HeroTitle>
            </Typewriter>
        </div>
        <slot></slot>
    </section>
    <div>
    </div>
</div>