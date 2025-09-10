# LiteLLM Opus-4 Node.js Proxy

A lightweight Node.js proxy server for Claude Opus-4 model using LiteLLM approach.

## Features

- ✅ Simple Node.js/Express server
- ✅ No Python dependency issues
- ✅ Fast JavaScript execution
- ✅ Reliable deployment
- ✅ Claude Opus-4 model support
- ✅ OpenAI-compatible API

## Quick Start

```bash
# Install dependencies
npm install

# Start server
npm start
```

## API Usage

### Health Check
```bash
curl http://localhost:3000/health
```

### List Models
```bash
curl -X GET http://localhost:3000/v1/models \
  -H "Authorization: Bearer sk-cursor-opus4-key"
```

### Chat Completion
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-cursor-opus4-key" \
  -d '{
    "model": "claude-opus-4",
    "messages": [{"role": "user", "content": "Hello!"}],
    "max_tokens": 1000
  }'
```

## Configuration

- **Port**: 3000 (configurable via PORT environment variable)
- **Model**: claude-opus-4
- **API Key**: sk-cursor-opus4-key (for authentication)

## Deployment

This proxy is designed for easy deployment on platforms like DigitalOcean App Platform, Heroku, Vercel, etc.

## License

MIT
