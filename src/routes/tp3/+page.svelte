<script lang="ts">
	import type { PageProps } from './$types';
	import { Chart } from 'chart.js/auto';

	let { data }: PageProps = $props();

	let ctx: HTMLCanvasElement;
	let chart: Chart | undefined;
	function graph(name: keyof typeof data.azules, cooler = false) {
		const status = cooler ? 'on' : 'off';

		const max_n = Math.max(...data.naranja.cosa);
		const max_a = Math.max(...data.azules[name][status]);

		if (chart) {
			chart.data.datasets[0].data = data.azules[name][status].map(
				(value) => value + max_n - max_a
			);

			return chart.update();
		}

		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: data.azules[name][status].map((_, i) => i + 1),
				datasets: [
					{
						label: 'CHANNEL 2',
						data: data.azules[name][status].map((value) => value + max_n - max_a),
						borderColor: 'rgb(75, 192, 192)',
						tension: 0.1,
						pointRadius: 0
					},
					{
						label: 'CHANNEL 1',
						data: data.naranja.cosa,
						borderColor: 'rgb(255, 128, 0)',
						tension: 0.1,
						pointRadius: 0
					}
				]
			},
			options: {
				scales: {
					x: {
						display: false,
						stacked: true
					}
				}
			}
		});
	}

	let name: keyof typeof data.azules = $state('Sin capacitor');
	let cooler = $state(false);
	$effect(() => {
		graph(name, cooler);
	});
</script>

<main
	class="mx-auto flex min-h-screen w-9/10 flex-col-reverse items-center justify-center gap-16 md:flex-row md:justify-around md:gap-4"
>
	<div class="flex flex-col items-center md:h-full md:w-5/9 md:justify-center">
		<canvas bind:this={ctx}></canvas>
	</div>
	<div class="flex flex-col items-center justify-center gap-2 md:h-full md:w-1/3">
		<select name="Capacitor" bind:value={name}>
			{#each Object.keys(data.azules) as name}
				<option value={name}>
					{name}
				</option>
			{/each}
		</select>
		<label for="cooler" class="flex items-center gap-2">
			Cooler
			<input type="checkbox" name="Cooler" id="cooler" bind:checked={cooler} />
		</label>
		<img
			src="/tp3/base-cooler.png"
			alt="Con cooler sin capacitor"
			class={name === 'Sin capacitor' && cooler ? '' : 'hidden'}
		/>
		<img
			src="/tp3/base-uncooler.png"
			alt="Sin cooler sin capacitor"
			class={name === 'Sin capacitor' && !cooler ? '' : 'hidden'}
		/>
		<img
			src="/tp3/cooler.png"
			alt="Con cooler"
			class={name !== 'Sin capacitor' && cooler ? '' : 'hidden'}
		/>
		<img
			src="/tp3/uncooler.png"
			alt="Sin cooler"
			class={name !== 'Sin capacitor' && !cooler ? '' : 'hidden'}
		/>
	</div>
</main>
