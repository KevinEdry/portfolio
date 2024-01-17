<script lang="ts">
    import "../app.css";
    import Typewriter from 'svelte-typewriter'
	import Menu from "$lib/menu/menu.svelte";
</script>

<div class="flex flex-row font-roboto min-h-full h-full">
    <nav class="flex flex-col w-1/12 h-full justify-end pb-10">
        <Menu />
    </nav>
    <section>
        <Typewriter mode="loop" cursor={false} interval={100} delay={5000}>
            <h1>Hello, I'm Kevin.</h1>
            <h1>नमस्ते, मैं केविन हूं।</h1>
            <h1>你好，我是凯文。</h1>
            <h1>Hola, soy Kevin.</h1>
            <h1>こんにちは、ケビンです。</h1>
            <h1>אהלן, אני קווין.</h1>
        </Typewriter>
        <slot></slot>
    </section>
    <div>

    </div>
</div>