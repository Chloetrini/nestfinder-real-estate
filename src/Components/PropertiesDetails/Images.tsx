interface ImagesProps {
    mainImage: string;
}

const Images = ({ mainImage }: ImagesProps) => {
  return ( 
    <div className="flex lg:flex-row flex-col gap-4 ">
        <div className="flex-1">
            <img src={mainImage} alt="Main Property" className="rounded-xl w-full h-full object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-4 flex-1">
           
            <img src={mainImage} className="rounded-xl h-[250px] w-full object-cover" />
            <img src={mainImage} className="rounded-xl h-[250px] w-full object-cover" />
            <img src={mainImage} className="rounded-xl h-[250px] w-full object-cover" />
            <img src={mainImage} className="rounded-xl h-[250px] w-full object-cover" />
        </div>
    </div>
  );
};

export default Images;