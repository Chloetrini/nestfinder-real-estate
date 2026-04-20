import { type FC } from 'react';

interface ButtonProps {
    onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ onClick }) => {
    return (
        <div className="w-full max-w-[163px]"> 
            <button
                onClick={onClick}
                className="w-full h-[49px] lg:w-[163px] text-[16px] max-[321px]:w-[140px] max-[320px]:h-[40px] max-[320px]:text-[14px] md:max-[768px]:h-[44px] rounded-[10px] px-4 py-2 text-white bg-[#1A3C34] transition-all hover:bg-[#132c26] flex items-center justify-center whitespace-nowrap"
            >
                View Property
            </button>
        </div>
    );
};

export default Button;