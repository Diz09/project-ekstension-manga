import React from 'react';
import { createRoot } from 'react-dom/client';
import Extension from './Extension';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Extension />
    </React.StrictMode>,
);