import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

interface LoaderProps {
	size?: number;
}

export const Loader: React.FC<LoaderProps> = ({ size = 62 }) => {
	const { pathname } = useLocation();
	const isAdmin = pathname.includes('admin');

	return (
		<div
			className={`w-full h-screen flex items-center justify-center ${
				isAdmin ? 'bg-black bg-opacity-10' : 'bg-white'
			}`}
		>
			<Spin
				indicator={
					<LoadingOutlined
						style={{ fontSize: size, color: '#9ec8fc' }}
						spin
					/>
				}
			/>
		</div>
	);
};
