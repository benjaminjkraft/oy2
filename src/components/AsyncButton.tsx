import { Button } from "@kobalte/core/button";
import type { ComponentProps } from "solid-js";
import { createSignal, Show, splitProps } from "solid-js";
import "./AsyncButton.css";

type AsyncButtonProps = {
	onClick: () => Promise<void>;
	disabled?: boolean;
} & Omit<ComponentProps<typeof Button>, "onClick" | "disabled">;

export function AsyncButton(props: AsyncButtonProps) {
	const [local, others] = splitProps(props, [
		"onClick",
		"disabled",
		"class",
		"children",
	]);
	const [loading, setLoading] = createSignal(false);

	const handleClick = async () => {
		setLoading(true);
		try {
			await local.onClick();
		} finally {
			setLoading(false);
		}
	};

	const className = () =>
		[local.class, "async-button"].filter(Boolean).join(" ");

	return (
		<Button
			{...others}
			class={className()}
			onClick={handleClick}
			disabled={local.disabled || loading()}
			aria-busy={loading()}
		>
			<span
				class="async-button-label"
				aria-hidden={loading() ? "true" : undefined}
			>
				{local.children}
			</span>
			<Show when={loading()}>
				<span class="async-button-spinner" aria-hidden="true" />
			</Show>
		</Button>
	);
}
