const express = require("express");
const app = express();

// Parse URL-encoded form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const logs = [];

app.all("/callback-return", (req, res) => {
  const entry = {
    time: new Date().toISOString(),
    method: req.method,
    query: req.query,
    body: req.body,
    headers: req.headers,
  };

  logs.push(entry);
  console.log("Received MPGS redirect:", entry);

  res.send(`
    <h1>Information Received</h1>
    <h2>Method</h2>
    <pre>${req.method}</pre>
    <h2>Query</h2>
    <pre>${JSON.stringify(req.query, null, 2)}</pre>
    <h2>Body</h2>
    <pre>${JSON.stringify(req.body, null, 2)}</pre>
    <h2>View all logs</h2>
    <a href="/logs">View Logs</a>
  `);
});

app.get("/logs", (req, res) => {
  res.send(`<pre>${JSON.stringify(logs, null, 2)}</pre>`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Callback listener running...");
});
