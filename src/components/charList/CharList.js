import './charList.scss';
import MarvelService from '../../services/MarvelService';
import {useState, useEffect, useRef} from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

const CharList = () => {
	const [charList, setCharList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, SetOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const marvelService = new MarvelService();

	componentDidMount() {
		this.onRequest()
	}

	onRequest = (offset) => {
		this.newCharListLoading()
		this.marvelService.getAllCharacters(offset)
			.then(this.onCharListLoaded)
			.catch(this.onError)
	}

	newCharListLoading = () => {
		this.setState({
			newItemLoading: true
		})
	}

	onCharListLoaded = (newCharList) => {
		let ended = false
		if (newCharList.length < 9) {
			ended = true
		}

		this.setState(({charList, offset}) => ({
			charList: [...charList, ...newCharList],
			loading: false,
			error: false,
			newItemLoading: false,
			offset: offset + 9,
			charEnded: ended,
		}))
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true,
		})
	}

	itemRefs = [];

	setRef = (ref) => {
		this.itemRefs.push(ref);
	}

	onFocusItem = (id) => {
		this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
		this.itemRefs[id].classList.add('char__item_selected');
		this.itemRefs[id].focus();
	}

	renderItems = (arr) => {
		const items = arr.map((item, i) => {
			let imgStyle = {objectFit: 'cover'}
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
				imgStyle = {objectFit: 'unset'}
			}

			return (
				<li className="char__item"
				    key={item.id}
				    ref={this.setRef}
				    tabIndex={0}
				    onClick={() => {
					    this.props.onSelectedChar(item.id)
					    this.onFocusItem(i)
				    }}
				    onKeyPress={(e) => {
					    if (e.key === ' ' || e.key === "Enter") {
						    this.props.onSelectedChar(item.id);
						    this.onFocusItem(i);
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

	render() {
		const {charList, loading, error, newItemLoading, offset, charEnded} = this.state
		const items = this.renderItems(charList)
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
					onClick={() => this.onRequest(offset)}
					style={{'display': charEnded ? 'none' : 'block'}}
					className="button button__main button__long"
				>
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

export default CharList;