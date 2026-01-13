import { For, Show } from "solid-js";
import type { Friend } from "../types";

type FriendsListProps = {
	friends: Friend[];
	onSendYo: (friendId: number) => void;
	onSendLo: (friendId: number) => void;
};

export function FriendsList(props: FriendsListProps) {
	return (
		<div class="list">
			<Show
				when={props.friends.length > 0}
				fallback={<p class="empty-state">No friends yet. Add some!</p>}
			>
				<For each={props.friends}>
					{(friend) => (
						<div class="list-item">
							<div class="list-item-content">
								<div class="list-item-title">{friend.username}</div>
							</div>
							<div class="list-item-actions">
								<button
									class="btn-yo"
									type="button"
									onClick={() => props.onSendYo(friend.id)}
								>
									Oy!
								</button>
								<button
									class="btn-lo"
									type="button"
									onClick={() => props.onSendLo(friend.id)}
								>
									Lo!
								</button>
							</div>
						</div>
					)}
				</For>
			</Show>
		</div>
	);
}
