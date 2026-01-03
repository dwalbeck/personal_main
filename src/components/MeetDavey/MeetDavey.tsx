import React from 'react';

const MeetDavey: React.FC = () => {
    return (
        <div id="meetdavey" className="meetdavey-section bg-purple-800 py-14">
            <div className="w-3/4 max-w-3/4 ml-auto mr-auto">
                <div className="container text-center mx-auto flex flex-col">
                    <h1 className="text-2xl font-light mb-0 text-white pb-14 w-full justify-center">Meet Davey</h1>
                    <div className="container w-full">
                        <video controls>
                            <source type="video/mp4" src="/davey_walbeck-video.mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetDavey;