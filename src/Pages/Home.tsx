import { useState, type FC } from 'react';

import RealDataFetching from '../Components/Home/RealDataFetching';
import Display from '../Components/Home/Display';
import Testimonials from '../Components/Home/Testimonials';
import Testimonials2 from '../Components/Home/Testimonials2';
import SignInModal from '../Components/Universal/SignInModal';
import HeaderContentSec from '../Components/Home/HeaderContentSec';
import WhyChooseUs from '../Components/Home/WhyChooseUs';

interface HomePageProps {
	isLoggedIn: boolean;
}


const HomePage: FC<HomePageProps> = ({isLoggedIn}) => {
	
	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<>
			<div >
                <HeaderContentSec isLoggedIn={isLoggedIn} setShowModal={setShowModal}/>
                <Testimonials />
				<RealDataFetching isLoggedIn={isLoggedIn} setShowModal={setShowModal} />
				<WhyChooseUs/>
				<Testimonials2 />
				
				
				<Display isLoggedIn={isLoggedIn} setShowModal={setShowModal}  />
			</div>
			{showModal && <SignInModal setShowModal={setShowModal} />}
		</>
	);
};

export default HomePage;
