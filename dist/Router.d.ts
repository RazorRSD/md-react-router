import React from 'react';
declare const Router: (props: {
    path?: string;
    hash?: string;
    onCallback?: () => void;
    children: React.ReactNode;
}) => JSX.Element | null;
export default Router;
