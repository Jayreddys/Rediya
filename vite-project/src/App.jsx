import React, {useEffect} from 'react'
import { fetchDataFromApi } from './utils/api'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './pages/home/Home'
import Details from './pages/details/Details'
import SearchResults from './pages/searchResults/SearchResults' 
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound'
import { getApiConfiguration } from './store/homeSlice'




const App = () => {
  const dispatch = useDispatch();

  const {isLoading, data, isError, error} = fetchDataFromApi("/configuration")

  useEffect(() => {
      if(!isLoading && !isError && data){
          const urls = {
            backdrop: data.data.images?.secure_base_url + "original",
            poster: data.data.images?.secure_base_url + "original",
            profile: data.data.images?.secure_base_url + "original",
          };
          dispatch(getApiConfiguration(urls));
      }
  }, [isLoading,isError,data]);

  if(isLoading)  return <p>Loading...</p>
  if(isError)  return <p>Error! {error.message}</p>

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:mediaType/:id' element={<Details/>}/>
        <Route path='/search/:query' element={<SearchResults/>}/>
        <Route path='/explore/:mediaType' element={<Explore/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

/*const {isLoading, isError, data, error } = fetchDataFromApi("/movie/popular")
  useEffect(() => {
    if(!isLoading && !isError && data){
      console.log(data);
    }
  
  }, [isLoading,isError,data])
  
  if(isLoading)  return <p>Loading...</p>
  if(isError)  return <p>Error! {error.message}</p>*/
