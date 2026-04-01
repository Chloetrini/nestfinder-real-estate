import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignInModalProps {
	setShowModal: (show: boolean) => void;
}

const SignInModal: FC<SignInModalProps> = ({ setShowModal }) => {
	const navigate =useNavigate()
	return (
		<div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-md flex items-center justify-center z-9999'>
			<div className='relative w-full max-w-120 max-h-[90%] min-h-75 bg-white flex items-center justify-center rounded-md'>
				<button
					className='absolute top-4 right-4 text-white bg-gray-400/40 hover:bg-gray-400 min-w-10 size-10 rounded-full'
					onClick={() => setShowModal(false)}>
					X
				</button>
				<div className=' space-y-5'>
					<h1 className='text-2xl text-center'>Are you a user?</h1>
					<div className="flex flex-row justify-center items-center gap-[12px]">
              <button  className="bg-[#1A3C34] rounded-[10px] py-[10px] px-[24px] text-white" onClick={()=> navigate('/login')} >Login</button>
              <button
                className="bg-[#1A3C34] rounded-[10px] py-[10px] px-[24px] text-white"
                onClick={()=> navigate('/signup')}
              >
                Sign Up
              </button>
            </div>

				</div>
			</div>
		</div>
	);
};

export default SignInModal;
