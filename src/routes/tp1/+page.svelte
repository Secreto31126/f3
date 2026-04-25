<script lang="ts">
    import type { PageProps } from './$types';

    const scale = 1000;

    let { data }: PageProps = $props();

    let selected = $state(0);
    const led = $derived(data.leds[selected]);

    let value = $state(0);
    const volts = $derived(value / scale);

    const current = $derived(led.vtoi(volts));
    const percent = $derived(Math.min(current / led.max_i * 100, 100));
    const boom = $derived(volts >= led.max_v);
</script>

<div class="grid grid-rows-2 md:grid-cols-2">
    <img
        src={!boom ? "/tp1/led.png" : "https://media.tenor.com/CF6RvBzqX5cAAAAM/boom-explosion.gif"}
        alt="{led.name} led"
        class="mx-auto"
        style="background-color: color-mix(in oklab, {led.color} {!boom ? percent : 0}%, transparent);"
    />

    <form class="flex flex-col justify-center w-5/6 gap-4">
        <div class="flex">
            <label for="color">Color: </label>
            <select name="color" id="color" bind:value={selected}>
                {#each data.leds as { name }, i (name)}
                    <option value={i}>{name}</option>
                {/each}
            </select>
        </div>

        <input type="range" name="voltage" id="voltage" min="0" max={led.max_v * scale} bind:value>
        <label for="voltage">
            Voltaje: {volts}V
            <br />
            Corriente: {current.toFixed(4)}mA
        </label>
    </form>
</div>
