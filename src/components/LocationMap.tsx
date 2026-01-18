import { createEffect, Show } from "solid-js";
import { initLocationMap } from "../map";
import { calculateDistance, formatDistance } from "../utils";
import "./LocationMap.css";

type LocationMapProps = {
	lat: number;
	lon: number;
	open: boolean;
	userLocation: { lat: number; lon: number } | null;
};

export function LocationMap(props: LocationMapProps) {
	let container: HTMLDivElement | undefined;

	createEffect(() => {
		if (props.open && container) {
			initLocationMap(container, props.lat, props.lon);
		}
	});

	const distance = () => {
		if (!props.userLocation) {
			return null;
		}
		const distanceKm = calculateDistance(
			props.userLocation.lat,
			props.userLocation.lon,
			props.lat,
			props.lon,
		);
		return formatDistance(distanceKm);
	};

	return (
		<div class="oys-location-map-container">
			<Show when={distance()}>
				<div class="oys-location-distance">{distance()} away</div>
			</Show>
			<div
				class="oys-location-map"
				ref={(el) => {
					container = el as HTMLDivElement;
				}}
				role="presentation"
			/>
		</div>
	);
}
