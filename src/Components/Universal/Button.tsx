import { type FC } from 'react';

interface ButtonProps {
	onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ onClick }) => {
	return (
		<div className="w-full max-w-[163px]"> 
            <button
                onClick={onClick}
                
                className='w-full h-[49px] max-[330px]:h-[40px] max-[330px]:text-[14px] rounded-[10px] px-4 py-2 text-white bg-[#1A3C34] transition-all hover:bg-[#132c26] whitespace-nowrap'
            >
                View Property
            </button>
        </div>
	);
};

export default Button;
