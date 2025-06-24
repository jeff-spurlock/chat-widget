# Chat Widget

A React-based chat widget that can be embedded in any website using a simple script tag. The widget is built with React and Tailwind CSS, and is bundled with Vite.

## Project Structure

- `client/`: Demo client page that loads the chat widget
- `server/`: Server that hosts the chat widget and its integration script
  - `src/`: Source code for the React chat widget
    - `components/`: React components
    - `index.tsx`: Main entry point for the widget
    - `index.css`: Tailwind CSS imports

## Development

### Server

```bash
cd server
npm install
npm run dev
```

### Client

```bash
cd client
npm install
npm run dev
```

## Building

```bash
cd server
npm run build
```

This will generate a UMD bundle in the `dist/` directory that can be loaded in any website.

## Integration

To integrate the chat widget in your website, add the following script tag:

```html
<script src="http://localhost:9000/integration"></script>
```

And add a container element with the ID "testdiv":

```html
<div id="testdiv"></div>
```

The script will create a shadow DOM inside this element and mount the React chat widget in it.

## Technologies Used

- React
- Tailwind CSS
- TypeScript
- Vite
- Bun 