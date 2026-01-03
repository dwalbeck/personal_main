import React from 'react';
import InterestCard from "./InterestCard";

const Interests: React.FC = () => {
    return (
        <div id="interests" className="interests-section bg-gray-200 py-14">
            <div className="w-3/4 max-w-3/4 ml-auto mr-auto">
                <div className="text-center mb-2">
                    <h1 className="text-2xl font-light mb-0 pb-8">Interests</h1>
                </div>
                <div className="mx-auto flex flex-row flex-wrap gap-[18px]">

                        <InterestCard
                            label="Outdoor Adventures"
                            baseImg="/outdoors-base.jpg"
                            extraImg={[
                                "/outdoors-1.jpg",
                                "/outdoors-2.jpg",
                                "/outdoors-3.jpg",
                                "/outdoors-4.jpg",
                                "/outdoors-5.jpg",
                                "/outdoors-6.jpg"
                            ]}
                        />
                        <InterestCard
                            label="Hanging with my pup Suki"
                            baseImg="/pup-base.jpg"
                            extraImg={[
                                "/pup-1.jpg",
                                "/pup-2.jpg",
                                "/pup-3.jpg",
                                "/pup-4.jpg",
                                "/pup-5.jpg",
                                "/pup-6.jpg"
                            ]}
                        />
                        <InterestCard
                            label="Designing and Building"
                            baseImg="/build-base.jpg"
                            extraImg={[
                                "/build-1.jpg",
                                "/build-2.jpg",
                                "/build-3.jpg",
                                "/build-4.jpg",
                                "/build-5.jpg",
                                "/build-6.jpg"
                            ]}
                        />
                        <InterestCard
                            label="Writing Music"
                            baseImg="/music-base.jpg"
                            extraImg={[
                                ""
                            ]}
                        />

                </div>
            </div>
        </div>
    );
};

export default Interests;