export interface PDF {
	id: number;
	pdf_document_name: string;
	company_name: string;
	num_pages: number;
	filepath: string;
}

export interface ChatMessage {
	id: number;
	session_id: number;
	role: string;
	message: string;
}

export interface Chunk {
	id: number;
	text: string;
	pageNum: number;
}

export interface Session {
	id: number;
	created_at: Date;
	name: string;
}
