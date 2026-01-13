import { For, Show } from "solid-js";
import type { Yo, YoPayload } from "../types";
import { formatTime } from "../utils";
import { LocationMap } from "./LocationMap";

type YosListProps = {
	yos: Yo[];
	openLocations: () => Set<number>;
	onToggleLocation: (yoId: number) => void;
};

export function YosList(props: YosListProps) {
	return (
		<div class="list">
			<Show
				when={props.yos.length > 0}
				fallback={<p class="empty-state">No Oys yet!</p>}
			>
				<For each={props.yos}>
					{(yo) => {
						const isLocation = yo.type === "lo" && !!yo.payload;
						const payload = yo.payload as YoPayload;
						const title = isLocation
							? `Lo from ${yo.from_username}`
							: `Oy from ${yo.from_username}`;
						const isOpen = () => props.openLocations().has(yo.id);

						return (
							<button
								class={`list-item${isLocation ? " list-item-location" : ""}`}
								type="button"
								onClick={() => isLocation && props.onToggleLocation(yo.id)}
								data-yo-id={yo.id}
								aria-expanded={isLocation ? isOpen() : undefined}
								disabled={!isLocation}
							>
								<div class="list-item-content">
									<div class="list-item-header">
										<div class="list-item-text">
											<div class="list-item-title">{title}</div>
											<div class="list-item-subtitle">
												{formatTime(yo.created_at)}
											</div>
										</div>
										<Show when={isLocation}>
											<div class="list-item-toggle-slot">
												<button
													class="yo-location-toggle"
													type="button"
													onClick={(event) => {
														event.stopPropagation();
														props.onToggleLocation(yo.id);
													}}
												>
													<span class="yo-location-button">
														<span
															class={`yo-location-arrow${
																isOpen() ? " is-open" : ""
															}`}
														/>
													</span>
												</button>
											</div>
										</Show>
									</div>
									<Show when={isLocation}>
										<div class="list-item-map-slot">
											<div class={`location-panel${isOpen() ? " open" : ""}`}>
												<LocationMap
													lat={payload.lat}
													lon={payload.lon}
													open={isOpen()}
												/>
											</div>
										</div>
									</Show>
								</div>
							</button>
						);
					}}
				</For>
			</Show>
		</div>
	);
}
