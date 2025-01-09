import { lazy } from 'react';
const Main = lazy(() => import('@/pages/main'));
export const Data = [
	{
		id: 1,
		path: '/',
		component: Main,
	},
];
