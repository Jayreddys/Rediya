import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchDataFromApi } from "../../../utils/api";
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { isLoading, data, isError, error } = fetchDataFromApi("/movie/upcoming");

    useEffect(() => {
        if (!isLoading && !isError && data) {
            const bg =
                url.backdrop +
                data.data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
            setBackground(bg);
        }
    }, [isLoading, isError, data]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };
//bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%
    return (
        <div className="heroBanner relative h-full w-full bg-neutral-800">
            {background && (
                <div className="relative h-3/4 w-screen">
                    <div className="absolute h-full w-full bg-gradient-to-r from-transparent from-10% via-transparent via-50% to-neutral-800 to-100%"></div>
                    <div className="absolute h-full w-full bg-gradient-to-l from-transparent from-10% via-transparent via-50% to-neutral-800 to-100%"></div>
                    <div className="absolute h-full w-full bg-gradient-to-b from-transparent from-10% via-transparent via-50% to-neutral-800 to-100%"></div>
                    <div className="absolute h-full w-full bg-gradient-to-t from-transparent from-10% via-transparent via-50% to-neutral-800 to-100%"></div>
                    <img src={`${background}`} className="h-full w-full rounded-md"/>
                </div>
            )}

            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 ">
                <ContentWrapper>
                    <div className="heroBannerContent text-center flex flex-col items-center justify-center text-neutral-200">
                        <span className="title block text-7xl font-medium mb-4 font-Montserrat">Welcome.</span>
                        <span className="subTitle block text-lg mb-8 font-Roboto">
                            Millions of movies, TV shows and people to discover. Explore now.
                        </span>
                        <div className="w-screen flex items-center justify-center">
                            <div className="searchInput w-1/2 relative">
                                <input
                                    type="text"
                                    placeholder="Search for a movie or TV show..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyUp={searchQueryHandler}
                                    className="border border-gray-300 rounded-r-full rounded-l-full px-4 py-2 mr-2 w-full h-12 text-black font-Montserrat outline-none"
                                />
                                <button className= " bg-neutral-600 text-white px-4 py-2 rounded-r-full absolute right-0 top-0 h-12 w-36">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
            </div>
        </div>
    );
};

export default HeroBanner;
