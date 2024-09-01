import React, { useState } from 'react';

function ChatGPTInteraction() {
	const [input, setInput] = useState('');
	const [response, setResponse] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

		const res = await fetch('http://localhost:5000/api/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ prompt: input })
		});

		const data = await res.json();
		setResponse(data.reply);
	};

	return (
		<div>
			<h1> ChatGPT Interaction </h1>
			<form onSubmit={handleSubmit}>
				<input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask something..." />
				<button className="btn" type="submit">
					Submit
				</button>
			</form>
			<div>
				<h3>Response:</h3>
				<p>{response}</p>
			</div>
		</div>
	);
}

export default ChatGPTInteraction;
