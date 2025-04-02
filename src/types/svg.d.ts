// svg.d.ts or svgr.d.ts (place in root or src/)

// Declaration for standard SVG imports -> React Component
declare module '*.svg' {
  import * as React from 'react';
  // This matches the exportType: 'default' setting in your next.config.ts
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

// Declaration for *.svg?url imports -> string (URL)
declare module '*.svg?url' {
  const content: string;
  export default content;
}

// Declaration for *.svg?react imports (if you explicitly use it)
declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}