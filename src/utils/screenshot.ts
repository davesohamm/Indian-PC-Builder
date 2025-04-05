
import html2canvas from 'html2canvas';

export const takeScreenshot = async (elementId?: string): Promise<string> => {
  try {
    // Ensure all fonts are loaded before taking the screenshot
    await document.fonts.ready;
    
    // If elementId is provided, capture that element, otherwise capture the whole document body
    const element = elementId ? document.getElementById(elementId) : document.body;
    if (!element) {
      throw new Error(`Element${elementId ? ` with ID ${elementId}` : ''} not found`);
    }
    
    // Force the 3D canvas to render before taking the screenshot
    const canvasElements = element.querySelectorAll('canvas');
    if (canvasElements.length > 0) {
      // Allow time for Three.js to render completely
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      logging: false,
      backgroundColor: null,
      useCORS: true, // Attempt to load cross-origin images
      allowTaint: true, // Allow tainted canvas if CORS fails
      width: elementId ? element.offsetWidth : window.innerWidth,
      height: elementId ? element.offsetHeight : window.innerHeight,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      // Properly handle WebGL canvas
      onclone: (documentClone) => {
        // Find all canvas elements in the cloned document
        const canvasElements = documentClone.querySelectorAll('canvas');
        
        // For each canvas in the clone, copy the content from the original
        canvasElements.forEach((clonedCanvas, index) => {
          const originalCanvas = element.querySelectorAll('canvas')[index];
          if (originalCanvas) {
            const context = clonedCanvas.getContext('2d');
            if (context) {
              // Copy the original canvas content to the cloned canvas
              clonedCanvas.width = originalCanvas.width;
              clonedCanvas.height = originalCanvas.height;
              context.drawImage(originalCanvas, 0, 0);
            }
          }
        });
        
        return new Promise(resolve => {
          setTimeout(resolve, 1000); // Give more time for rendering
        });
      }
    });
    
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error taking screenshot:', error);
    throw error;
  }
};

export const downloadScreenshot = (dataUrl: string, filename = 'pc-build.png') => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
};

export const openScreenshotInNewTab = (dataUrl: string) => {
  const newTab = window.open();
  if (newTab) {
    newTab.document.write(`
      <html>
        <head>
          <title>PC Build Screenshot</title>
          <style>
            body { 
              margin: 0; 
              padding: 20px; 
              display: flex; 
              justify-content: center;
              background-color: #f5f5f5;
            }
            img { 
              max-width: 100%; 
              box-shadow: 0 4px 8px rgba(0,0,0,0.1);
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" alt="PC Build Screenshot">
        </body>
      </html>
    `);
    newTab.document.title = 'PC Build Screenshot';
  }
};
