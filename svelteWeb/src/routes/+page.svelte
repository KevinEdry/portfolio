<script lang="ts">
    import Signature from '$lib/icons/signature.svelte';
    import TwitterIcon from '$lib/icons/social/twitter.svelte';
    import GithubIcon from '$lib/icons/social/github.svelte';
    import MediumIcon from '$lib/icons/social/medium.svelte';
    import LinkedinIcon from '$lib/icons/social/linkedin.svelte';
</script>

<section class="flex">
    <div class="w-1/2">
        <img src="/avatar.png" alt="avatar">
    </div>
    <div class="w-1/2 flex flex-col gap-8">
        <hr class="text-primary w-40"/>
        <div class="flex flex-col gap-3">
            <h1 class="text-4xl font-black">Kevin Edry</h1>
            <p class="text-text/40">Senior Engineering Manager</p>
        </div>

        <div class="flex flex-col gap-6 w-3/4 text-sm">
            <p>Hello! I’m Kevin, a seasoned Engineering Manager based in Seattle, WA. With an extensive background in software engineering, I specialize in leading and scaling high-performing engineering teams to build enterprise-level software. I have a strong knack for guiding teams through complex software development life cycles.</p>
            <p>I have been privileged to be a part of several accelerator programs that have significantly contributed to my professional growth. These include AWS Floor 28 Builder Space, Fusion LA, and Facebook for Startups. Participation in these programs has not only broadened my network and knowledge base but also sharpened my skills in various aspects of technology and business leadership.</p>
            <p>Driven by a commitment to innovation and leveraging the latest in technology to create efficient, automated systems, I am dedicated to contributing to a leading tech company. With my extensive management experience and a proven track record in the tech industry, I am poised to enhance any suite of platforms, particularly in the realm of enterprise SaaS models.</p>
        </div>
        <Signature />
        <ul class="flex gap-8">
            <li><TwitterIcon/></li>
            <li><GithubIcon/></li>
            <li><MediumIcon/></li>
            <li><LinkedinIcon/></li>
        </ul>
    </div>
    
</section>