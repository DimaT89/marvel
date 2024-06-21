import './charList.scss';
import MarvelService from '../../services/MarvelService';
import {useState, useEffect, useRef} from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const CharList = (props) => {
	const [charList, setCharList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const marvelService = new MarvelService();

	useEffect(() => {
		onRequest()
	}, []);

	const onRequest = (offset) => {
		newCharListLoading()
		marvelService.getAllCharacters(offset)
			.then(onCharListLoaded)
			.catch(onError)
	}

	const newCharListLoading = () => {
		setNewItemLoading(true)
	}

	const onCharListLoaded = (newCharList) => {
		let ended = false
		if (newCharList.length < 9) {
			ended = true
		}

		setCharList([...charList, ...newCharList])
		setLoading(false)
		setError(false)
		setNewItemLoading(false)
		setOffset(offset => offset + 9)
		setCharEnded(ended)
	}

	const onError = () => {
		setError(true)
		setLoading(true)
	}

	const itemRefs = useRef([]);

	const onFocusItem = (id) => {
		itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
		itemRefs.current[id].classList.add('char__item_selected');
		itemRefs.current[id].focus();
	}

	function renderItems(arr) {
		const items = arr.map((item, i) => {
			let imgStyle = {objectFit: 'cover'}
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
				imgStyle = {objectFit: 'unset'}
			}

			return (
				<li className="char__item"
				    key={item.id}
				    ref={el => itemRefs.current[i] = el}
				    tabIndex={0}
				    onClick={() => {
					    props.onSelectedChar(item.id)
					    onFocusItem(i)
				    }}
				    onKeyPress={(e) => {
					    if (e.key === ' ' || e.key === "Enter") {
						    props.onSelectedChar(item.id);
						    onFocusItem(i);
					    }
				    }}
				>
					<img src={item.thumbnail} alt={item.name} style={imgStyle}/>
					<div className="char__name">{item.name}</div>
				</li>
			)
		})

		return (
			<ul className="char__grid">
				{items}
			</ul>
		)
	}

	const items = renderItems(charList)
	const errorMessage = error ? <ErrorMessage/> : null
	const spinner = loading ? <Spinner/> : null
	const content = !(errorMessage || spinner) ? items : null

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{content}
			<button
				disabled={newItemLoading}
				onClick={() => onRequest(offset)}
				style={{'display': charEnded ? 'none' : 'block'}}
				className="button button__main button__long"
			>
				<div className="inner">load more</div>
			</button>
		</div>
	)
}

export default CharList;