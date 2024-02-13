import React, { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.js",
	import.meta.url
).toString();

function highlightPattern(text, pattern) {
	return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

export default function Test() {
	const [searchText, setSearchText] = useState("");

	const textRenderer = useCallback(
		(textItem) => highlightPattern(textItem.str, searchText),
		[searchText]
	);

	function onChange(event) {
		setSearchText(event.target.value);
	}

	return (
		<>
			<Document file="antifragile.pdf">
				<Page
					renderAnnotationLayer={false}
					pageNumber={50}
					customTextRenderer={textRenderer}
				/>
			</Document>
			<div>
				<label htmlFor="search">Search:</label>
				<input
					type="search"
					id="search"
					value={searchText}
					onChange={onChange}
				/>
			</div>
		</>
	);
}
