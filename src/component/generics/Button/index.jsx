import React from 'react';
import { Button } from './style';

const GenericButton = ({
	children,
	loading = false,
	disabled = false,
	component,
	icon,
	openFilter,
	style,
	// styling props
	margin,
	marginLeft,
	marginRight,
	padding,
	gap,
	radius,
	width,
	height,
	bgcolor = '#fff',
	bghovercolor,
	hovercolor,
	bordercolor,
	position,
	zIndex,
	justifyContent,
	color,
	...rest
}) => {
	const waveColor =
		bgcolor === '#ffffff' ||
		bgcolor === '#fff' ||
		bgcolor === 'transparent' ||
		bgcolor === 'white'
			? color
			: bgcolor;

	return (
		<Button
			{...rest}
			zIndex={zIndex}
			loading={loading}
			position={position}
			disabled={disabled}
			hovercolor={hovercolor}
			bghovercolor={bghovercolor}
			bgcolor={bgcolor}
			justifyContent={justifyContent}
			gap={gap}
			padding={padding}
			radius={radius}
			width={width}
			height={height}
			component={component}
			icon={icon}
			margin={margin}
			bordercolor={bordercolor}
			marginRight={marginRight}
			marginLeft={marginLeft}
			openFilter={openFilter}
			style={{
				'--antd-wave-shadow-color': waveColor,
				...style, // allow overriding styles
			}}
		>
			{children}
		</Button>
	);
};

export default GenericButton;
