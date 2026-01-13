import type { User } from "../types";

type AppHeaderProps = {
	user: User;
	onLogout: () => void;
};

export function AppHeader(props: AppHeaderProps) {
	return (
		<div class="header">
			<h1 class="logo-small">Oy</h1>
			<div class="user-info">
				<span>{props.user.username}</span>
				<button class="btn-text" type="button" onClick={props.onLogout}>
					Logout
				</button>
			</div>
		</div>
	);
}
