import React from 'react';
import { createRoot } from 'react-dom/client';
import Widget from './Widget';
import './styles.css';

// Function to mount the widget in shadow DOM
function mountWidget() {
  const targetElement = document.getElementById('my-integration-id');
  
  if (!targetElement) {
    console.error('Target element with id "my-integration-id" not found');
    return;
  }

  // Create shadow root
  const shadow = targetElement.attachShadow({ mode: 'open' });
  
  // Create a container div inside the shadow DOM
  const container = document.createElement('div');
  shadow.appendChild(container);
  
  // Create styles element and inject Tailwind CSS
  const style = document.createElement('style');
  // Note: In a real implementation, you'd want to inject the compiled CSS here
  // For now, we'll add some basic styles to make the text visible
  style.textContent = `
    .text-red-500 {
      color: rgb(239 68 68);
    }
    .text-4xl {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }
    * {
      box-sizing: border-box;
    }
  `;
  shadow.appendChild(style);
  
  // Create React root and render the widget
  const root = createRoot(container);
  root.render(React.createElement(Widget));
  
  console.log('Widget mounted successfully in shadow DOM');
}

// Auto-mount when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountWidget);
} else {
  mountWidget();
}

// Export for manual mounting if needed
(window as any).mountWidget = mountWidget;
