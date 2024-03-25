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
}

export interface BotMessage extends ChatMessage {
	chunks: Chunk[];
}

export interface Chunk {
	id: number;
	text: string;
	pageNum: number;
	pdfName: string;
	pdfID: number;
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
