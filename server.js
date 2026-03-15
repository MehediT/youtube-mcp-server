import express from 'express';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createServer } from '@mrsknetwork/ytmcp';

const app = express();
app.use(express.json());

app.post('/mcp', async (req, res) => {
  const server = createServer(process.env.YOUTUBE_API_KEY);
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
  res.on('finish', () => server.close());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MCP server listening on port ${PORT}`));
