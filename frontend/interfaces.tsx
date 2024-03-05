export interface PDF {
	id: number;
	name: string;
	numPages: number;
	path: string;
}

export interface Query {
	id: number;
	text: string;
}

export interface Chunk {
	id: number;
	text: string;
	pageNum: number;
}
