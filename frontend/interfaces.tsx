export interface PDF {
	id: number;
	pdf_document_name: string;
	company: string;
	num_pages: number;
	filepath: string;
}

export interface ChatMessage {
	session_id: number;
	role: string;
	message: string;
	created_at: Date;
}

export interface BotMessage extends ChatMessage {
	chunks: Chunk[];
}

export interface Chunk {
	id: number;
	text: string;
	page_num: number;
	pdf_name: string;
	pdf_id: number;
	score: number;
}

export interface Session {
	id: number;
	created_at: Date;
	name: string;
}

export interface SessionDisplay {
	today: Session[];
	yesterday: Session[];
	lastWeek: Session[];
	lastMonth: Session[];
	lastYear: Session[];
}
