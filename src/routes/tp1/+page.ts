import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		leds: [
			{
				name: 'Naranja',
				color: 'oklch(70.5% 0.213 47.604)',
				max_v: 3.1,
				max_i: 20,
				values: [
					{ v: 0.0, i: 0.0 },
					{ v: 0.47, i: 0.0 },
					{ v: 0.9, i: 0.0 },
					{ v: 1.49, i: 0.0 },
					{ v: 2.0, i: 0.0 },
					{ v: 2.52, i: 0.0 },
					{ v: 2.66, i: 1.2 },
					{ v: 2.7, i: 2.0 },
					{ v: 2.8, i: 5.1 },
					{ v: 2.9, i: 9.1 },
					{ v: 3.0, i: 13.7 },
					{ v: 3.1, i: 20.0 }
				],
				vtoi(volts: number) {
					const x = this.values.findIndex(val => val.v > volts);

					if (x === 0) return 0;

					const start = this.values.at(x - 1);
					const end = this.values.at(x);
					return start.i + (end.i - start.i) * (volts - start.v) / (end.v - start.v);
				}
			}
		] as const
	};
}) satisfies PageLoad;
