import type { JSX } from "solid-js";

type LoginScreenProps = {
	onSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent>;
};

export function LoginScreen(props: LoginScreenProps) {
	return (
		<div class="screen">
			<div class="container">
				<h1 class="logo">Oy</h1>
				<p class="tagline">Send Oys to your friends</p>
				<form onSubmit={props.onSubmit}>
					<input
						type="text"
						name="username"
						placeholder="Enter username"
						autocomplete="username"
						required
						minlength="2"
						maxlength="20"
					/>
					<button type="submit" class="btn-primary">
						Get Started
					</button>
				</form>
			</div>
		</div>
	);
}
