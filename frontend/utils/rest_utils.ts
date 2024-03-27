export async function get(
	token: string | null,
	endpoint: string,
	errorMessage: string,
	onSuccess: (data: any) => void
) {
	try {
		const response = await fetch(`http://13.213.71.123/api${endpoint}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error(errorMessage);
		} else {
			const data = await response.json();
			onSuccess(data);
		}
	} catch (error) {
		console.error("Error:", error);
	}
}

export async function post(
	token: string | null,
	body: any,
	endpoint: string,
	errorMessage: string,
	onSuccess: (data: any) => void
) {
	try {
		const response = await fetch(`http://13.213.71.123/api${endpoint}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		if (!response.ok) {
			throw new Error(errorMessage);
		} else {
			const data = await response.json();
			onSuccess(data);
		}
	} catch (error) {
		console.error("Error:", error);
	}
}
