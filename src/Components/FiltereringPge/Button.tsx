import { type FC } from 'react';

interface ButtonProps {
	onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ onClick }) => {
	return (
		<div>
			<button
				onClick={onClick}
				className='w-[163px] h-[49px] rounded-[10px] px-[24px] py-[12px] text-white bg-[#1A3C34]'>
				View Property
			</button>
		</div>
	);
};

export default Button;
