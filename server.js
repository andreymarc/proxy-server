import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Proxy Endpoint
app.post('/proxy', async (req, res) => {
  try {
    // Extracting request data from the embedded script
    const {
      zip_code,
      move_to_zip_code,
      move_to_state,
      move_date,
      moving_size,
      long_distance_custom,
    } = req.body;

    // Construct the payload for the API
    const payload = {
      auth: {
        lp_campaign_id: '677ff7da637d0', // Replace with your campaign ID
        lp_campaign_key: 'QZNTw8fVBCJYn3tWGvFx', // Replace with your campaign key
      },
      mode: {
        lp_test: true, // Set to false for production
      },
      lead: {
        zip_code,
        move_date,
        move_to_state,
        move_to_zip_code,
        moving_size,
        long_distance_custom,
      },
    };

    console.log('Payload Sent to API:', JSON.stringify(payload, null, 2));

    // Make the API request
    const response = await fetch('https://movingchecklist.leadspediatrack.com/pre-ping.do', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('API Response:', data);

    // Return the API response to the client (embedded script)
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch movers' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
