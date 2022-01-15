import tw, { styled } from "twin.macro";

const widthStyles = {
	quarter: tw`w-1/4`,
	third: tw`w-1/3`,
	half: tw`w-1/2`,
	twothirds: tw`w-2/3`,
	full: tw`w-full`
};

const ButtonContainer = tw.div`flex flex-col justify-center p-3`;

interface IStyledButton {
	width: string;
	disabled: boolean;
}

const StyledButton = styled.button(
	({
		width,
		disabled
	}: IStyledButton) => [
		tw`relative flex items-center justify-center mr-6 text-base font-bold tracking-wide uppercase transition transition-duration[.3s] rounded shadow-none h-11 text-gray-50 bg-indigo-700 hover:cursor-pointer hover:bg-transparent hover:text-indigo-700 hover:border-indigo-700 hover:border-width[2px] hover:border-opacity-5`,
		(widthStyles as any)[width],
		disabled &&
			tw`pointer-events-none grayscale`
	]
);

const ErrorMessage = tw.span`py-3 px-1 scale-75 text-opacity-50 text-base text-red-500 uppercase`;

interface IButton {
	label: string;
	width: string;
	disabled: boolean;
	error: string;
	onClick(): void;
}

const Button = ({
	label,
	width,
	disabled,
	error,
	...buttonProps
}: IButton) => (
	<ButtonContainer>
		<StyledButton
			width={width}
			disabled={disabled}
			data-testid={"button"}
			{...buttonProps}>
			{label}
		</StyledButton>
		{error ? (
			<ErrorMessage>
				{error}
			</ErrorMessage>
		) : null}
	</ButtonContainer>
);

Button.defaultProps = {
	disabled: false,
	label: "Label",
	width: "full"
};

export default Button;
