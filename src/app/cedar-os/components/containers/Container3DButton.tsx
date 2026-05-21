import {
	useStyling,
	cn,
	createBorderColor,
	getShadedColor,
	getTextColorForBackground,
} from 'cedar-os';
import { HTMLMotionProps, motion } from 'motion/react';
import React from 'react';

interface Container3DButtonProps
	extends Omit<HTMLMotionProps<'button'>, 'children' | 'color' | 'onDrag'> {
	children: React.ReactNode;
	color?: string;
	childClassName?: string;
	motionProps?: HTMLMotionProps<'button'>;
	withMotion?: boolean;
}

const Container3DButton: React.FC<Container3DButtonProps> = ({
	children,
	className = '',
	childClassName = '',
	motionProps = {},
	style,
	color,
	type = 'button',
	withMotion = true,
	...props
}) => {
	const { styling } = useStyling();
	const isDarkMode = styling.darkMode ?? false;
	const shadeBase = color || (isDarkMode ? '#000000' : '#ffffff');

	const baseStyle: React.CSSProperties = {
		boxShadow: isDarkMode
			? [
					`0px 2px 0px 0px ${getShadedColor(shadeBase, 80)}`,
					'-12px 18px 16px 0px rgba(0,0,0,0.4)',
					'-6px 10px 8px 0px rgba(0,0,0,0.4)',
					'-2px 4px 3px 0px rgba(0,0,0,0.3)',
					'-1px 2px 3px 0px rgba(255,255,255,0.05) inset',
			  ].join(', ')
			: [
					`0px 2px 0px 0px ${getShadedColor(shadeBase, 50)}`,
					'-12px 18px 16px 0px rgba(0,0,0,0.14)',
					'-6px 10px 8px 0px rgba(0,0,0,0.14)',
					'-2px 4px 3px 0px rgba(0,0,0,0.15)',
					'-1px 2px 3px 0px rgba(0,0,0,0.12) inset',
			  ].join(', '),
		willChange: 'transform, backdrop-filter',
		transform: 'translateZ(0)',
	};

	const colorStyle: React.CSSProperties = color
		? { backgroundColor: color, borderColor: createBorderColor(color) }
		: {};
	const textStyle: React.CSSProperties = color
		? { color: getTextColorForBackground(color) }
		: {};

	return (
		<motion.button
			type={type}
			className={cn(
				'rounded-xl border-[3px] backdrop-blur-[12px] cursor-pointer',
				!color &&
					(isDarkMode
						? 'border-gray-700 bg-black/40'
						: 'border-white bg-[#FAF9F580]'),
				className
			)}
			style={{
				...baseStyle,
				...colorStyle,
				...textStyle,
				...style,
			}}
			{...(withMotion ? motionProps : {})}
			{...props}>
			<div className={childClassName}>{children}</div>
		</motion.button>
	);
};

export default Container3DButton;
