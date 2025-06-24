import React from 'react';
import { createRoot } from 'react-dom/client';
import Widget from './Widget';
// Import CSS for webpack to process it
import './styles.css';

// Function to load CSS and inject it into shadow DOM
async function loadCSS(shadow: ShadowRoot) {
  try {
    // Get the current script's base URL to resolve the CSS file path
    const currentScript = document.currentScript as HTMLScriptElement;
    const scriptSrc = currentScript?.src;
    
    console.log('Script src:', scriptSrc);
    
    if (scriptSrc) {
      // Resolve CSS file path relative to the script
      const scriptUrl = new URL(scriptSrc);
      const cssUrl = new URL('styles.css', scriptUrl);
      
      console.log('Trying to fetch CSS from:', cssUrl.href);
      
      // Fetch the compiled CSS
      const response = await fetch(cssUrl.href);
      console.log('CSS fetch response status:', response.status);
      
      if (response.ok) {
        const cssText = await response.text();
        console.log('CSS loaded, length:', cssText.length);
        console.log('CSS preview:', cssText.substring(0, 500));
        
        // Create and inject style element
        const style = document.createElement('style');
        style.textContent = cssText;
        shadow.appendChild(style);
        
        console.log('CSS injected into Shadow DOM successfully');
        return true;
      } else {
        console.error('CSS fetch failed with status:', response.status);
      }
    } else {
      console.error('Could not determine script source URL');
    }
  } catch (error) {
    console.error('Failed to load external CSS:', error);
  }
  
  console.error('CSS loading failed - no styles will be applied');
  return false;
}

// Function to mount the widget in shadow DOM
async function mountWidget() {
  const targetElement = document.getElementById('my-integration-id');
  
  if (!targetElement) {
    console.error('Target element with id "my-integration-id" not found');
    return;
  }

  // Create shadow root
  const shadow = targetElement.attachShadow({ mode: 'open' });
  
  // Load and inject CSS
  await loadCSS(shadow);
  
  // Create a container div inside the shadow DOM
  const container = document.createElement('div');
  shadow.appendChild(container);
  
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
