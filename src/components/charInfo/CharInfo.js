import './charInfo.scss';
import {useEffect, useState} from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {
	const [char, setChar] = useState(null);

	const {loading, error, clearError, getCharacter} = useMarvelService();

	useEffect(() => {
		updateChar()
	}, [props.charId]);


	const onCharLoaded = (char) => {
		setChar(char)
	}

	const updateChar = () => {
		const {charId} = props
		if (!charId) {
			return
		}

		clearError()
		getCharacter(charId)
			.then(onCharLoaded)
	}

	const skeleton = char || loading || error ? null : <Skeleton/>
	const spinner = loading ? <Spinner/> : null
	const errorMessage = error ? <ErrorMessage/> : null
	const content = !(loading || error || !char) ? <View char={char}/> : null

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	)
}

const View = ({char}) => {
	const {name, description, homepage, thumbnail, wiki, comics} = char

	let imgStyle = {objectFit: 'cover'};
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' || thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif') {
		imgStyle = {objectFit: 'unset'};
	}

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle}/>
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{
					comics.length > 0 ? null : 'There is no comics with character'
				}

				{
					comics.map((item, i) => {
						if (i > 9) return null
						return (
							<li key={i} className="char__comics-item">
								{item.name}
							</li>
						)
					})
				}
			</ul>
		</>
	)
}

export default CharInfo;