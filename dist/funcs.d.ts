import React from 'react';
declare const getRoutes: (routes: {
    path?: string;
    hash?: string;
    component: React.FunctionComponent;
    onCallback?: () => void;
}[], notFound?: React.FunctionComponent<{}> | undefined) => (JSX.Element | (() => React.FunctionComponent<{}> | JSX.Element))[];
export default getRoutes;
