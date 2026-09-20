import {  type FC } from 'react';
import { useSeo } from '@/hooks/use-seo'

import FeaturedProperties from '@/components/home/featured-properties';
import Display from '@/components/home/display';
import Testimonials from '@/components/home/stats-strip';
import Testimonials2 from '@/components/home/testimonials';
import SignInModal from '@/components/shared/sign-in-modal';
import HeaderContentSec from '@/components/home/hero';
import WhyChooseUs from '@/components/home/why-choose-us';
import { useAuth } from '@/context/auth-context';
import Reveal from '@/components/ui/reveal';
import HeaderNavBar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';




const HomePage: FC = () => {
  useSeo({ title: 'NestFinder Pro', description: 'Find, rent and buy verified homes across Nigeria. Compare listings, see prices and contact agents on NestFinder Pro.' })
	
	const {showModal} = useAuth()

	return (
		<>
			<div >
				 <HeaderNavBar />
                <HeaderContentSec />
                <Testimonials />
				<FeaturedProperties />
				<Reveal><WhyChooseUs/></Reveal>
				<Testimonials2 />
				<Reveal><Display  /></Reveal>
				<Footer/>
			</div>
			{showModal && <SignInModal  />}
		</>
	);
};

export default HomePage;
