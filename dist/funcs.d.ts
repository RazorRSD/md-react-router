import React from 'react';
declare const getRoutes: (routes: {
    path?: string;
    hash?: string;
    component: React.FunctionComponent;
    onCallback?: () => void;
}[]) => JSX.Element[];
export default getRoutes;
