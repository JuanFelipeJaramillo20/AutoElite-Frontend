import { useState, useEffect } from 'react';

import Lottie from 'lottie-react';
import loaderLottie from '../../assets/animations/carLoader.json';

import { CardCar } from '../../components/CardCar/CardCar';
import { Boton } from '../../components/Boton/Boton';
import { Alert } from '../../components/Alert/Alert';

import './Publicaciones.css';
import { useDispatch, useSelector } from 'react-redux';
import { cargarPublicaciones } from '../../redux/publicaciones/thunk';
import { getPublicaciones } from '../../redux/publicaciones/selectors';
import { getToken } from '../../redux/usuario/selectors';

export const Publicaciones = () => {

    const dispatch = useDispatch();

    const token = useSelector(getToken);
    const resumenPublicaciones = useSelector(getPublicaciones);

    const [currentPage, setCurrentPage] = useState(1);
    const [carsPerPage] = useState(8);
    const [totalPages, setTotalPages] = useState(0);
    const [allPosts, setAllPosts] = useState([]);
    const [alert, setAlert] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const deletePublicacion = async (idPublicacion) => {
        const response = await fetch(
            `http://localhost:8080/api/v1/publicaciones/${idPublicacion}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            }
        );
        console.log(token)
        if (response.ok) {
            setAllPosts((prevPub) => {
                return prevPub.filter((pub) => pub.id != idPublicacion);
            });
            setShowAlert(true);
            setAlert(() => {
                return {
                    title:'Operación realizada',
                    message: 'Eliminada con éxito',
                    type: 'exito',
                };
            });
        } else {
            setShowAlert(true);
            setAlert(() => {
                return {
                    title:'Operación no realizada',
                    message: 'Intenta otra vez',
                    type: 'error',
                };
            });
        }
    };

    // API call to fetch cars data
    useEffect(() => {
        dispatch(cargarPublicaciones());
        setAllPosts(resumenPublicaciones);
    }, []);

    //set the total pages of the catalog
    useEffect(() => {
        setTotalPages(Math.ceil(resumenPublicaciones.length / carsPerPage));
    }, [resumenPublicaciones]);


    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {showAlert ? (
                <Alert type={alert.type} title={alert.title} message={alert.message} setShowModal={setShowAlert} />
            ) : null}
            <section className='publicaciones-section'>
                <h2 className='publicaciones-section__title'>Lista de Publicaciones</h2>
                <div className='catalog-page'>
                    <div className='catalog-page__column2'>
                        <div className='car-list'>
                            {resumenPublicaciones.length === 0 ? (
                                <>
                                    <Lottie className='loader-cars' animationData={loaderLottie} />
                                </>
                            ) : (
                                <>
                                    {allPosts.map((publicacion) => {
                                        return (
                                            <CardCar
                                                key={publicacion.idPublicacion}
                                                idPublicacion={publicacion.idPublicacion}
                                                srcImageCar='https://i.imgur.com/xyiSDoE.jpeg'
                                                yearCarro={publicacion.carroPublicacion.year}
                                                modeloCarro={publicacion.carroPublicacion.tipo}
                                                marcaCarro={publicacion.carroPublicacion.marca}
                                                precio={publicacion.carroPublicacion.precio}
                                                ciudadVenta={publicacion.carroPublicacion.ciudad}
                                                kilometraje={publicacion.carroPublicacion.kilometraje}
                                                tipoTransmision={
                                                    publicacion.carroPublicacion.transmision
                                                }
                                                tipoCombustible={
                                                    publicacion.carroPublicacion.combustible
                                                }
                                                estado={publicacion.carroPublicacion.estado}
                                                deletePublicacion={deletePublicacion}
                                                showOpt={true}
                                            ></CardCar>
                                        );
                                    })
                                    }
                                </>
                            )}
                        </div>
                        <div className='pagination'>
                            {currentPage > 1 && currentPage == totalPages ? (
                                <div className='pagination__atras'>
                                    <p>
                                        {currentPage} de {totalPages}
                                    </p>
                                    <Boton
                                        classIcon='fa-solid fa-arrow-left'
                                        texto='Atrás'
                                        tipo='button'
                                        onClick={() => paginate(currentPage - 1)}
                                    />
                                </div>
                            ) : (
                                currentPage > 1 && (
                                    <div className='pagination__atras'>
                                        <Boton
                                            classIcon='fa-solid fa-arrow-left'
                                            texto='Atrás'
                                            tipo='button'
                                            onClick={() => paginate(currentPage - 1)}
                                        />
                                    </div>
                                )
                            )}
                            {currentPage < totalPages && (
                                <div className='pagination__adelante'>
                                    <p>
                                        {currentPage} de {totalPages}
                                    </p>
                                    <Boton
                                        classIcon='fa-solid fa-arrow-right'
                                        texto='Siguiente'
                                        tipo='button'
                                        onClick={() => {
                                            paginate(currentPage + 1);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
