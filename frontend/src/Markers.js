import React from 'react';

export const LinkMarkers = () => (
    <svg style={{ position: "absolute", top: 0, left: 0 }}>
    <defs>
        <marker id="hasMany" viewBox="0 0 10 13" markerHeight="10" markerWidth="13" refX="10" refY="6.5" fill="none">
            <path d="M10 12C2.57803 12 0.909955 8.66667 1.00367 7" stroke="#B1B1B6"/>
            <path d="M10 1C2.57803 1 0.909955 5 1.00367 7" stroke="#B1B1B6"/>
        </marker>
    </defs>
    <defs>
      <marker id="hasManyReversed" viewBox="0 0 10 13" markerHeight="10" markerWidth="13" refX="10" refY="6.5" fill="none" orient="auto-start-reverse">
        <path d="M10 12C2.57803 12 0.909955 8.66667 1.00367 7" stroke="#B1B1B6"/>
        <path d="M10 1C2.57803 1 0.909955 5 1.00367 7" stroke="#B1B1B6"/>
      </marker>
    </defs>
    <defs>
      <marker id="hasOne" viewBox="0 0 6 6" markerHeight="6" markerWidth="6" refX="6" refY="3" fill="none">
        <circle cx="3" cy="3" r="3" fill="#B1B1B6"/>
      </marker>
    </defs>
    <defs>
      <marker id="hasOneReversed" viewBox="0 0 6 6" markerHeight="6" markerWidth="6" refX="6" refY="3" fill="none" orient="auto-start-reverse">
        <circle cx="3" cy="3" r="3" fill="#B1B1B6"/>
      </marker>
    </defs>
  </svg>
);
