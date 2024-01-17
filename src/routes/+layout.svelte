<script>
    import "../app.css";
    import Typewriter from 'svelte-typewriter'
</script>

<div class="flex flex-row font-roboto">
    <nav class="w-1/12">
        <ul>
            <li>about</li>
            <li>projects</li>
            <li>blog</li>
            <li>contact</li>
        </ul>
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