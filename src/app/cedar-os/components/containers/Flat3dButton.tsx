import { cn, useStyling, getShadedColor, getLightenedColor } from 'cedar-os';
import { HTMLMotionProps, motion } from 'motion/react';
import React from 'react';

interface Flat3dButtonProps
	extends Omit<HTMLMotionProps<'button'>, 'children' | 'onDrag'> {
	children: React.ReactNode;
	isDarkTheme?: boolean;
	primaryColor?: string;
	className?: string;
	layoutId?: string;
}

const Flat3dButton: React.FC<Flat3dButtonProps> = ({
	children,
	isDarkTheme = false,
	primaryColor,
	className = '',
	layoutId,
	style,
	type = 'button',
	...props
}) => {
	const { styling } = useStyling();
	const darkThemeEnabled = isDarkTheme || styling.darkMode;

	let backgroundStyle: React.CSSProperties;
	let edgeShadow: string;

	if (primaryColor) {
		const light = getLightenedColor(primaryColor, 40);
		const dark = getShadedColor(primaryColor, 40);
		backgroundStyle = {
			background: `linear-gradient(to bottom, ${light}, ${dark})`,
		};
		edgeShadow = `0px 1px 0px 0px ${getShadedColor(
			primaryColor,
			30
		)}, 0 4px 6px 0 rgba(0,0,0,0.20)`;
	} else {
		backgroundStyle = darkThemeEnabled
			? {
					background: `linear-gradient(to bottom, rgb(38,38,38), rgb(20,20,20))`,
			  }
			: {
					background: `linear-gradient(to bottom, #FAFAFA, #F0F0F0)`,
			  };

		edgeShadow = darkThemeEnabled
			? `0px 1px 0px 0px ${getShadedColor(
					'#000000',
					20
			  )}, 0 4px 6px 0 rgba(0,0,0,0.20)`
			: `0px 1px 0px 0px ${getShadedColor(
					'#ffffff',
					30
			  )}, 0 4px 6px 0 rgba(0,0,0,0.35)`;
	}

	return (
		<motion.button
			type={type}
			layoutId={layoutId}
			className={cn('rounded-lg cursor-pointer', className)}
			style={{
				boxShadow: edgeShadow,
				willChange: 'box-shadow, transform',
				...backgroundStyle,
				...style,
			}}
			{...props}>
			{children}
		</motion.button>
	);
};

export default Flat3dButton;
