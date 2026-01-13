import { Button } from "@kobalte/core/button";
import "./UpdateToast.css";

type UpdateToastProps = {
	onRefresh: () => void;
};

export function UpdateToast(props: UpdateToastProps) {
	return (
		<div class="update-toast">
			<span>Update available</span>
			<Button onClick={props.onRefresh}>Refresh</Button>
		</div>
	);
}
