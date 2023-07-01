import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Alert } from '../../components/Alert/Alert';
import { NoEncontrado } from '../NoEncontrado/NoEncontrado';
import Lottie from 'lottie-react';

import { getAllUsers, blockUser, deleteUser } from '../../redux/usuario/thunk';
import { getToken, getRol, getId } from '../../redux/usuario/selectors';

import noUsers from '../../assets/animations/noUsers.json';
import img from '../../assets/img/perfil/usuario.png';

import './InicioAdmin.css';

export const InicioAdmin = () => {

    const navigate = useNavigate();

    const userToken = useSelector(getToken);
    const userRole = useSelector(getRol);
    const userID = useSelector(getId);

    const [showAlert, setShowAlert] = useState(false);
    const [titleAlert, setTitleAlert] = useState('');
    const [messageAlert, setMessageAlert] = useState('');
    const [typeAlert, setTypeAlert] = useState('');
    const [userList, setUserList] = useState([]);
    const [reload, setReload] = useState(0);

    const handleBlockUser = useCallback(async (idUser) => {
        const [status, response] = await blockUser(idUser);
        if (status) {
            setShowAlert(true);
            setTypeAlert('exito');
            setTitleAlert('Operación realizada');
            setMessageAlert(response);
        } else {
            setShowAlert(true);
            setTypeAlert('error');
            setTitleAlert('Algo salió mal');
            setMessageAlert(response);
        }
        setReload((prevValue) => {return (prevValue + 1)});
    }, []);

    const handleDeleteUser = useCallback(async (idUser) => {
        const [state, response] = await deleteUser(idUser);
        if (state) {
            setShowAlert(true);
            setTypeAlert('exito');
            setTitleAlert('Operación realizada');
            setMessageAlert(response);
        } else {
            setShowAlert(true);
            setTypeAlert('error');
            setTitleAlert('Algo salió mal');
            setMessageAlert(response);
        }
        setReload((prevValue) => {return (prevValue + 1)});
    }, []);

    useEffect(() => {
        const getUsers = async () => {
            if (userRole !== 'USER' && userRole !== '') {
                const [state, allUserData] = await getAllUsers(userToken);
                if (state) {
                    setUserList(allUserData);
                } else {
                    setShowAlert(true);
                    setTitleAlert('Error');
                    setMessageAlert('Intenta otra vez');
                }
            }
        };
        getUsers();
    }, [userRole, userToken,reload]);

    return (
        <>
            {userRole === 'ADMIN' ? (
                <>
                    {showAlert ? (
                        <Alert type={typeAlert} title={titleAlert} message={messageAlert} setShowModal={setShowAlert} />
                    ) : null}
                    <section className='users-section'>
                        <header className='users-section__title'>
                            <h2>Lista de Usuarios</h2>
                        </header>
                        <article className='users-section__content'>
                            {(userList.length > 1) ? (
                                userList.map((user) => {
                                    if (user.id !== userID) {
                                        return (
                                            <div key={user.id} className={user.bloqueado ? 'user-information bloqueado' : 'user-information'}>
                                                <div>
                                                    <div onClick={() => { navigate(`/perfil/${user.id}`) }}>
                                                        <img src={user.imagenPerfil ? user.imagenPerfil : img} alt="user profile img" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p>
                                                        <span>Nombre<i className="fa-regular fa-circle-check"></i></span>
                                                        <span>{user.nombres}</span>
                                                    </p>
                                                </div>
                                                <div>
                                                    <p>
                                                        <span>Correo</span>
                                                        <span>{user.email}</span>
                                                    </p>
                                                </div>
                                                <div>
                                                    <p>
                                                        <span>Teléfono</span>
                                                        <span>{user.telefono}</span>
                                                    </p>
                                                </div>
                                                <div className='admin-controller'>
                                                    <button 
                                                        onClick={() => {handleDeleteUser(user.id)}}
                                                    >
                                                        <span><i className="fa-solid fa-user-minus"></i></span>
                                                    </button>
                                                    <button
                                                        onClick={() => { handleBlockUser(user.id) }}
                                                        disabled={user.bloqueado}
                                                    >
                                                        <span><i className="fa-solid fa-user-slash"></i></span>
                                                    </button>
                                                    <button onClick={() => { navigate(`/usuarios/editar/${user.id}`) }}>
                                                        <span><i className="fa-solid fa-user-pen"></i></span>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    }
                                })
                            ) : (
                                <Lottie className='user-loader__admin' animationData={noUsers} />
                            )}
                        </article>
                    </section>
                </>
            ) : (
                <NoEncontrado />
            )}
        </>
    );
};