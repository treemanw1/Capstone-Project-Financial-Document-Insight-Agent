export interface PDF {
	id: number;
	name: string;
	numPages: number;
	path: string;
}

export interface Message {
	id: string;
	content: string;
}

export interface Chunk {
	id: number;
	text: string;
	pageNum: number;
}
