import { useState, type FC } from 'react';

import RealDataFetching from '../Components/LandingPage/RealDataFetching';
import Display from '../Components/LandingPage/Display';
import Testimonials from '../Components/LandingPage/Testimonials';
import Testimonials2 from '../Components/LandingPage/Testimonials2';
import SignInModal from '../Components/Modals/SignInModal';
import HeaderContentSec from '../Components/LandingPage/HeaderContentSec';
import WhyChooseUs from '../Components/LandingPage/WhyChooseUs';

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
