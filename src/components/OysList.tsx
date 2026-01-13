import { Button } from "@kobalte/core/button";
import { For, Show } from "solid-js";
import type { Oy, OyPayload } from "../types";
import { formatTime } from "../utils";
import { LocationMap } from "./LocationMap";
import "./OysList.css";

type OysListProps = {
	oys: Oy[];
	openLocations: () => Set<number>;
	onToggleLocation: (oyId: number) => void;
};

export function OysList(props: OysListProps) {
	return (
		<div class="oys-list">
			<Show
				when={props.oys.length > 0}
				fallback={<p class="oys-empty-state">No Oys yet!</p>}
			>
				<For each={props.oys}>
					{(oy) => {
						const isLocation = oy.type === "lo" && !!oy.payload;
						const payload = oy.payload as OyPayload;
						const title = isLocation
							? `Lo from ${oy.from_username}`
							: `Oy from ${oy.from_username}`;
						const isOpen = () => props.openLocations().has(oy.id);

						return (
							<Button
								class={`oys-list-item${
									isLocation ? " oys-list-item-location" : ""
								}`}
								onClick={() => isLocation && props.onToggleLocation(oy.id)}
								data-oy-id={oy.id}
								aria-expanded={isLocation ? isOpen() : undefined}
								disabled={!isLocation}
							>
								<div class="oys-list-item-content">
									<div
										class={`oys-list-item-header${isLocation ? " oys-list-item-header-location" : ""}`}
									>
										<div class="oys-list-item-text">
											<div class="oys-list-item-title">{title}</div>
											<div class="oys-list-item-subtitle">
												{formatTime(oy.created_at)}
											</div>
										</div>
										<Show when={isLocation}>
											<div class="oys-list-item-toggle-slot">
												<Button
													class="oys-location-toggle"
													onClick={(event) => {
														event.stopPropagation();
														props.onToggleLocation(oy.id);
													}}
												>
													<span class="oys-location-button">
														<span
															class={`oys-location-arrow${
																isOpen() ? " is-open" : ""
															}`}
														/>
													</span>
												</Button>
											</div>
										</Show>
									</div>
									<Show when={isLocation}>
										<div class="oys-list-item-map-slot">
											<div
												class={`oys-location-panel${isOpen() ? " open" : ""}`}
											>
												<LocationMap
													lat={payload.lat}
													lon={payload.lon}
													open={isOpen()}
												/>
											</div>
										</div>
									</Show>
								</div>
							</Button>
						);
					}}
				</For>
			</Show>
		</div>
	);
}
