import { serve } from "bun";
import { readFileSync, existsSync } from "fs";
import { join } from "path";


// Demo HTML content
const demoHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Widget Demo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        .widget-container {
            border: 2px dashed #ddd;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            background-color: #fafafa;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Widget Integration Demo</h1>
        <p>The widget will be mounted in the div below:</p>
        <div class="widget-container">
            <div id="my-integration-id"></div>
        </div>
        <button onclick="loadWidget()">Load Widget</button>
    </div>
    
    <script>
        function loadWidget() {
            const script = document.createElement('script');
            script.src = '/integration';
            document.head.appendChild(script);
        }
    </script>
</body>
</html>
`;

const server = serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === "/") {
      return new Response(demoHTML, {
        headers: { "Content-Type": "text/html" },
      });
    }
    
    if (url.pathname === "/integration") {
      // Serve the bundled integration script
      try {
        const bundlePath = join(process.cwd(), "dist", "integration.js");
        if (existsSync(bundlePath)) {
          const content = readFileSync(bundlePath, "utf-8");
          return new Response(content, {
            headers: { "Content-Type": "application/javascript" },
          });
        } else {
          return new Response("// Bundle not found. Please run 'bun run build' first.", {
            headers: { "Content-Type": "application/javascript" },
          });
        }
      } catch (error) {
        return new Response("// Error loading bundle: " + error, {
          headers: { "Content-Type": "application/javascript" },
        });
      }
    }
    
    if (url.pathname === "/styles.css") {
      // Serve the compiled CSS file
      try {
        const cssPath = join(process.cwd(), "dist", "styles.css");
        if (existsSync(cssPath)) {
          const content = readFileSync(cssPath, "utf-8");
          return new Response(content, {
            headers: { "Content-Type": "text/css" },
          });
        } else {
          return new Response("/* CSS not found. Please run 'bun run build' first. */", {
            headers: { "Content-Type": "text/css" },
            status: 404,
          });
        }
      } catch (error) {
        return new Response("/* Error loading CSS: " + error + " */", {
          headers: { "Content-Type": "text/css" },
          status: 500,
        });
      }
    }
    
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}/`);
