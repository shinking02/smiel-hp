import type { ReactNode } from "react";

export const CONTROL =
	"block w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base placeholder:text-zinc-400 transition-colors duration-200 hover:border-zinc-400 focus-visible:border-brand-600 focus-visible:outline-offset-0 user-invalid:border-red-600";

interface FieldProps {
	/** The id of the control inside, which the label points at. */
	htmlFor: string;
	label: string;
	required?: boolean;
	children: ReactNode;
}

export const Field = ({ htmlFor, label, required, children }: FieldProps) => (
	<div className="flex flex-col gap-2">
		<label
			htmlFor={htmlFor}
			className="flex items-center gap-2 font-semibold text-sm"
		>
			{label}
			{required === true && (
				// The control's `required` already tells assistive technology.
				<span
					aria-hidden
					className="rounded-sm bg-brand-50 px-1.5 py-0.5 text-brand-800 text-xs"
				>
					必須
				</span>
			)}
		</label>
		{children}
	</div>
);
