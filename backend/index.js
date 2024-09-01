// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// Initialize the app
const app = express();
app.use(cors());
app.use(express.json());

// Set up the PostgreSQL pool
const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT
});

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
	if (err) {
		console.error('Error connecting to the database', err);
	} else {
		console.log('Connected to the database:', res.rows[0]);
	}
});

// Define a test route
app.get('/', (req, res) => {
	res.send('API is working!');
});

app.post('/api/chat', async (req, res) => {
	const { prompt } = req.body;

	// Here, you'd typically send the prompt to the ChatGPT API and get a response
	// For now, let's mock the response

	const mockResponse = `You asked: ${prompt}. This is a mock response!`;

	res.json({ reply: mockResponse });
});

const axios = require('axios');

app.post('/api/chat', async (req, res) => {
	const { prompt } = req.body;

	try {
		const response = await axios.post(
			'https://api.openai.com/v1/completions',
			{
				model: 'text-davinci-003', // or another model of your choice
				prompt: prompt,
				max_tokens: 150
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
				}
			}
		);

		res.json({ reply: response.data.choices[0].text });
	} catch (error) {
		console.error('Error communicating with ChatGPT API:', error);
		res.status(500).json({ error: 'Failed to fetch response from ChatGPT' });
	}
});


// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
