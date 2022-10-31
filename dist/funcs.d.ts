import React from 'react';
declare const getRoutes: (routes: {
    path?: string;
    hash?: string;
    component: React.FunctionComponent;
    onCallback?: () => void;
}[], notFound?: React.FunctionComponent<{}> | undefined) => (JSX.Element | (() => JSX.Element | React.FunctionComponent<{}>))[];
export default getRoutes;
