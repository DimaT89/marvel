import React from 'react';
import img from './error.gif';
import './error.scss'

const ErrorMessage = () => {
	return (
		<img
			className='error'
			src={img}
			alt={'error-message'}
		/>
	);
};

export default ErrorMessage;
