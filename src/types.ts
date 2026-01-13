export type User = {
	id: number;
	username: string;
};

export type Friend = {
	id: number;
	username: string;
};

export type YoPayload = {
	lat: number;
	lon: number;
	accuracy?: number | null;
};

export type Yo = {
	id: number;
	from_username: string;
	created_at: number;
	type: string;
	payload?: YoPayload | null;
};

export type SearchUser = Friend & { added?: boolean };
