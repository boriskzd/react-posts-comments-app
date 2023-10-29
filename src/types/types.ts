export interface PostData {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface UserData {
	id: Number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}

export interface CommentsData {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}
