const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
const GRADIENT_API_KEY = "sk-do-x93BpwFtL3AIaBc28PU_QDZmlNZR8IdxBjee_vdFL25hWlxvV8Kr9D9K72";
const GRADIENT_BASE_URL = "https://inference.do-ai.run/v1";

// Middleware
app.use(express.json());

// Routes
app.get('/v1/models', (req, res) => {
  res.json({
    object: "list",
    data: [{
      id: "claude-opus-4",
      object: "model",
      created: Date.now(),
      owned_by: "gradient"
    }]
  });
});

app.post('/v1/chat/completions', async (req, res) => {
  try {
    const { model, ...requestData } = req.body;
    
    // Validate model
    if (model !== 'claude-opus-4' && model !== 'anthropic-claude-opus-4') {
      return res.status(400).json({
        error: `Model ${model} not supported. Use claude-opus-4`
      });
    }
    
    console.log(`Received request for model: ${model}`);
    
    // Transform request for Gradient API
    const gradientRequest = {
      ...requestData,
      model: 'anthropic-claude-opus-4',
      max_tokens: requestData.max_tokens || 32768
    };
    
    // Call Gradient API
    const response = await axios.post(
      `${GRADIENT_BASE_URL}/chat/completions`,
      gradientRequest,
      {
        headers: {
          'Authorization': `Bearer ${GRADIENT_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 120000
      }
    );
    
    console.log(`Gradient API response status: ${response.status}`);
    
    // Transform response back
    const gradientResponse = response.data;
    gradientResponse.model = model; // Use original model name
    
    res.json(gradientResponse);
    
  } catch (error) {
    console.error('Error in chat completions:', error.message);
    
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: Date.now(),
    service: 'litellm-opus4-nodejs'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Node.js LiteLLM Opus-4 Proxy running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🎯 Model: claude-opus-4`);
});

module.exports = app;
