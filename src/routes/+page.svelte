<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->

<script lang="ts">
	let v1 = $state(9.3);
	let v2 = $state(1.524);
	let r1 = $state(99.2);
	let r2 = $state(218);
	let r3 = $state(325);

	let i3 = $derived(((v1 * r2) / (r1 + r2) + v2) / (r3 + (r1 * r2) / (r1 + r2)));
	let i2 = $derived((i3 * r3 - v2) / r2);
	let i1 = $derived(i2 + i3);

	function updateV1() {
		const volts = prompt('Voltaje:');
		if (volts) {
			v1 = parseFloat(volts);
		}
	}

	function updateV2() {
		const volts = prompt('Voltaje:');
		if (volts) {
			v2 = parseFloat(volts);
		}
	}

	function updateR1() {
		const ohms = prompt('Ohms:');
		if (ohms) {
			r1 = parseFloat(ohms);
		}
	}

	function updateR2() {
		const ohms = prompt('Ohms:');
		if (ohms) {
			r2 = parseFloat(ohms);
		}
	}

	function updateR3() {
		const ohms = prompt('Ohms:');
		if (ohms) {
			r3 = parseFloat(ohms);
		}
	}
</script>

<div class="flex h-screen flex-col items-center justify-center gap-8 bg-gray-100">
	<div class="flex h-1/2 w-4/5">
		<div class="relative size-full border-2 *:z-10">
			<div class="absolute top-1/2 -left-1/12 w-1/6">
				{@render batery(updateV1, v1, 'l')}
			</div>
			<div class="absolute -top-4 left-1/2 -translate-1/2">
				{@render resistor(updateR1, r1, 't')}
			</div>
			<div class="absolute top-1/2 -right-22 -translate-1/2">
				{@render resistor(updateR2, r2, 'r')}
			</div>
			<img
				src="https://cdn-icons-png.flaticon.com/512/159/159061.png"
				alt="direction"
				class="absolute top-1/2 left-1/2 w-1/6 -translate-1/2 {i1 > 0
					? ''
					: 'scale-x-[-1]'}"
			/>
		</div>
		<div class="relative size-full border-2 *:z-10">
			<div class="absolute -top-4 left-1/2 -translate-1/2">
				{@render resistor(updateR3, r3, 't')}
			</div>
			<div class="absolute top-1/2 -right-1/12 w-1/6">
				{@render batery(updateV2, v2, 'r')}
			</div>
			<img
				src="https://cdn-icons-png.flaticon.com/512/159/159061.png"
				alt="direction"
				class="absolute top-1/2 left-1/2 w-1/6 -translate-1/2 {i3 > 0
					? ''
					: 'scale-x-[-1]'}"
			/>
		</div>
	</div>
	<div class="flex w-full justify-evenly *:text-center">
		<p>I1: {i1.toFixed(4)}A</p>
		<p>I2: {i2.toFixed(4)}A<br />(Si es negativa va para arriba)</p>
		<p>I3: {i3.toFixed(4)}A</p>
	</div>
</div>

{#snippet batery(onclick: () => void, volts: number, pos: 'l' | 'r' | 't' | 'b')}
	{@const rotation = {
		l: 'rotate-0',
		r: 'rotate-180',
		t: 'rotate-90',
		b: '-rotate-90'
	}[pos]}

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		{onclick}
		class="flex w-full cursor-pointer bg-gray-100 *:h-full *:w-1/3 *:border-y {rotation}"
	>
		<span class={volts > 0 ? 'border-b-gray-100' : 'border-t-gray-100'}>&nbsp;</span>
		<span class="flex rotate-0 items-center justify-center {pos === 'r' ? 'rotate-180' : ''}"
			>{Math.abs(volts)}V</span
		>
		<span class={volts > 0 ? 'border-b-gray-100' : 'border-t-gray-100'}>&nbsp;</span>
	</div>
{/snippet}

{#snippet resistor(onclick: () => void, ohms: number, pos: 'l' | 'r' | 't' | 'b')}
	{@const rotation = {
		l: 'rotate-90',
		r: 'rotate-90',
		t: 'rotate-0',
		b: 'rotate-0'
	}[pos]}

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="cursor-pointer bg-gray-100 underline decoration-wavy decoration-4 underline-offset-4 {rotation}"
		{onclick}
	>
		<span>
			{ohms} ohms
		</span>
	</div>
{/snippet}
