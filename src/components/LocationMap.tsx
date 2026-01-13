import { createEffect } from "solid-js";
import { initLocationMap } from "../map";

type LocationMapProps = {
	lat: number;
	lon: number;
	open: boolean;
};

export function LocationMap(props: LocationMapProps) {
	let container: HTMLDivElement | undefined;

	createEffect(() => {
		if (props.open && container) {
			initLocationMap(container, props.lat, props.lon);
		}
	});

	return (
		<div
			class="yo-location-map"
			ref={(el) => {
				container = el as HTMLDivElement;
			}}
			role="presentation"
		/>
	);
}
