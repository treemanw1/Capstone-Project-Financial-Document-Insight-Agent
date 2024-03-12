export async function post(
	body: Record<string, any>,
	endpoint: string,
	onSuccess: (data: Record<string, any>) => void
) {
	try {
		const response = await fetch(`http://localhost:8000${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		if (!response.ok) {
			throw new Error("Failed to fetch response.");
		} else {
			const data = await response.json();
			onSuccess(data);
			// setMessages(
			// 	messages.concat([query]).concat({
			// 		id: data.response.id,
			// 		text: data.response.text,
			// 	})
			// );
			// setChunks(chunks.concat(data.chunks));
		}
	} catch (error) {
		console.error("Error:", error);
	}
}
