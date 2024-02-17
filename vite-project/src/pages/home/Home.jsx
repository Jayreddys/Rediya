import React from "react";


import HeroBanner from "./HomeBanner/HeroBanner";

const Home = () => {
    return (
        <>
            <div className="h-screen w-screen bg-neutral-800">
            <HeroBanner />
            </div>
            <div className="h-screen w-screen bg-neutral-800">
            </div>
        </>
    );
};

export default Home;