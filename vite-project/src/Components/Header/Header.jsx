import React,{useState, useEffect} from 'react'
import {HiOutlineSearch} from "react-icons/hi"
import {SlMenu} from "react-icons/sl"
import {VscChromeClose} from "react-icons/vsc"
import { useNavigate, useLocation } from 'react-router-dom'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import logo from '../../../movie.png'
import {motion, useScroll, useMotionValueEvent, animate } from 'framer-motion'


const Header = () => {
  const [hide, setHide] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [query, setQuery] = useState("")
  const [showSeacrh, setShowSeacrh] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const {scrollY} = useScroll()

  const openSearch = ()=>{
    setMobileMenu(false)
    setShowSeacrh(true)
    console.log(true)
  }

  const openMobileMenu = ()=>{
    setMobileMenu(true)
    setShowSeacrh(false)
  }

  const searchQueryHandler = (event) => {
      if (event.key === "Enter" && query.length > 0) {
          navigate(`/search/${query}`);
      }
  };

  const navigationHandler = (type)=>{
    if(type==="movie"){
        navigate("/explore/movie")
    }
    else if(type==="tv"){
      navigate("/explore/tv")
    }
    else{
      navigate("/")
    }
  }

  useMotionValueEvent(scrollY, "change", (latest)=>{
      const previous = scrollY.getPrevious();
      if(latest > previous && latest>200){
        setHide(true)
      }
      else{
        setHide(false)
      }
      console.log(previous,latest)
      console.log(hide)
  })

  return (
          <motion.div   animate={hide?{y:"-100%"}:{y:0}} transition={{duration:0.35, ease:"easeInOut"}} className='sticky top-0 z-20 w-screen bg-neutral-800 md:bg-transparent'>
          <div className={`w-full flex items-center justify-between ${mobileMenu ? "bg-neutral-800": "backdrop-filter backdrop-blur-sm bg-transparent z-50"} p-4`}>
              <div className=''>
                <img src={logo} alt="" className=' h-16 w-40 cursor-pointer' onClick={()=>navigationHandler('home')}/>
              </div>
              <div className='hidden md:flex'>
                  <button className=' text-white p-4 hover:text-yellow-700' onClick={()=>{navigationHandler("movie")}}>Movies</button>
                  <button className=' text-white p-4 hover:text-yellow-700' onClick={()=>{navigationHandler("tv")}}>TV Shows</button>
              </div>
              <div className='lg:hidden text-white flex items-center justify-around gap-8 font-Montserrat'>
                <HiOutlineSearch className=' cursor-pointer hover:text-yellow-800' onClick={showSeacrh? (()=> setShowSeacrh(false)): openSearch} />
                {mobileMenu? (<VscChromeClose onClick={()=>{setMobileMenu(false)}} className=' cursor-pointer'/>) : (<SlMenu onClick={openMobileMenu} className=' cursor-pointer hover:text-yellow-800'/>) }
              </div>
          </div>
          <motion.p  animate={mobileMenu?{ y: 0 }:{y:-350}} transition={{duration: 0.3, ease:"easeInOut" }} className='lg:hidden p-4 text-white bg-neutral-900 cursor-pointer hover:text-yellow-800' onClick={()=>{navigationHandler("movie")}}><span className=' '>Movies</span></motion.p>
          <motion.p  animate={mobileMenu?{ y: 0 }:{y:-350}} transition={{ duration: 0.3 , ease:"easeInOut"}} className='lg:hidden p-4 text-white bg-neutral-900 cursor-pointer hover:text-yellow-800' onClick={()=>{navigationHandler("tv")}}><span className=''>TV Shows</span></motion.p>
          <motion.input  animate={showSeacrh?{ y: 0 }:{ y: -350 }} transition={{duration: 0.2, ease:"easeInOut" }}
                                        type="text"
                                        placeholder="Search for a movie or TV show..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyUp={searchQueryHandler} 
                                          className=' lg:hidden h-10 p-8 w-full rounded-full outline-none'
                                        />
                                        
        </motion.div>
  )
}

export default Header