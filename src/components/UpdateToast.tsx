type UpdateToastProps = {
	onRefresh: () => void;
};

export function UpdateToast(props: UpdateToastProps) {
	return (
		<div class="update-toast">
			<span>Update available</span>
			<button class="btn-secondary" type="button" onClick={props.onRefresh}>
				Refresh
			</button>
		</div>
	);
}
