//folder components file App.js
import React, { useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView'; 
import { DataContext } from './components/context/DataContext';
import './App.css';
import './components/helper'



const API_URL = "https://itunes.apple.com/search?term=";

function App() {
	let [search, setSearch] = useState('')
	let [message, setMessage] = useState('Search for Music!')
	let [data, setData] = useState([])


	useEffect(() => {
		if(search) {
			const fetchData = async () => {
				document.title = `${search} Music`
				const response = await fetch(API_URL + search)
				const resData = await response.json()
				if (resData.results.length > 0) {
					setData(resData.results)
				} else {
					setMessage('Not Found')
				}
			}
			fetchData()
		}
	}, [search])
	
	const handleSearch = (e, term) => {
		e.preventDefault()
		setSearch(term)
	}

	return (
		<div>
		<p>{message}</p>	
			<Router>
				<Routes>
					<Route path='/' element={
					<Fragment>
						<SearchBar handleSearch = {handleSearch}/>
						<DataContext.Provider value={data}>
							<Gallery data={data} />
						</DataContext.Provider>
					</Fragment>
					} />
					<Route path="/album/:id" element={<AlbumView />} />
					<Route path="/artist/:id" element={<ArtistView />} />
				</Routes>
			</Router>
			
		</div>
  	);
}

export default App;