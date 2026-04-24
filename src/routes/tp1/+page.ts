import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		leds: [
			{
				name: 'Orange',
				color: 'oklch(70.5% 0.213 47.604)',
				max_v: 3,
				max_i: 20,
				values: [
					{ v: 0.0, i: 0.0 },
					{ v: 0.47, i: 0.0 },
					{ v: 0.9, i: 0.1 },
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
					if (volts < 2.52) return 0;
					return 0.188 - 0.0179 * volts + 0.551 * volts ** 2;
				}
			}
		] as const
	};
}) satisfies PageLoad;
