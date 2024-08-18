import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import {useState} from 'react';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ComicsList from '../comicsList/ComicsList';

const App = () => {
	const [selectedChar, setSelectedChar] = useState(null);

	const onSelectedChar = (id) => {
		setSelectedChar(id)
	}

	return (
		<div className="app">
			<AppHeader/>
			<ComicsList/>
			{/*<main>*/}
			{/*	<ErrorBoundary>*/}
			{/*		<RandomChar/>*/}
			{/*	</ErrorBoundary>*/}
			{/*	<div className="char__content">*/}
			{/*		<ErrorBoundary>*/}
			{/*			<CharList onSelectedChar={onSelectedChar}/>*/}
			{/*		</ErrorBoundary>*/}
			{/*		<ErrorBoundary>*/}
			{/*			<CharInfo charId={selectedChar}/>*/}
			{/*		</ErrorBoundary>*/}
			{/*	</div>*/}
			{/*	<img className="bg-decoration" src={decoration} alt="vision"/>*/}
			{/*</main>*/}
		</div>
	)
}

export default App;