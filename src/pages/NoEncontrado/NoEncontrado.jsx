import { useNavigate } from 'react-router-dom';

import Lottie from 'lottie-react';
import notFound from '../../assets/animations/notFount.json';

import './NoEncontrado.css';

export const NoEncontrado = () => {
    const history = useNavigate();
    return (
        <div className='not-found'>
            <div className='error-loader'>
                <Lottie className='loader-not-found' animationData={notFound} />
            </div>
            <div className='back-error-page'>
                <button onClick={() => { history('/') }}>
                    Volver
                </button>
            </div>
        </div>
    );
};