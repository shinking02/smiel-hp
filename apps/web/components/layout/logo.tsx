interface LogoProps {
	className?: string;
}

/** Drawn in `currentColor`, so one mark serves both light and dark grounds. */
export const Logo = ({ className }: LogoProps) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth={1.5}
		strokeMiterlimit={10}
		aria-hidden
		className={className}
	>
		<path d="M6.28,22.49h7.56a4.74,4.74,0,0,0,3.37-1.4l4.71-4.71a2,2,0,0,0,.59-1.45,2,2,0,0,0-3.45-1.41l-5.15,5.15H13a1.9,1.9,0,0,0,1.88-2.22,2,2,0,0,0-2-1.59H9.14l-.93-.46a4.66,4.66,0,0,0-5,.54,4.6,4.6,0,0,0-1.69,3.62v.11" />
		<line x1="12.95" y1="18.67" x2="8.19" y2="18.67" />
		<path d="M5.33,1.51H7.23A4.77,4.77,0,0,1,12,6.28v0a0,0,0,0,1,0,0H10.09A4.77,4.77,0,0,1,5.33,1.51v0A0,0,0,0,1,5.33,1.51Z" />
		<path
			d="M16.77,2.47h1.91a0,0,0,0,1,0,0v0a4.77,4.77,0,0,1-4.77,4.77H12a0,0,0,0,1,0,0v0A4.77,4.77,0,0,1,16.77,2.47Z"
			transform="translate(30.68 9.7) rotate(180)"
		/>
		<line x1="12" y1="14.86" x2="12" y2="6.28" />
	</svg>
);
