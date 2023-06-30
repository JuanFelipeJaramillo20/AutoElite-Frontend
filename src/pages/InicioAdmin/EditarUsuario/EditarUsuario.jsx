import { useParams } from 'react-router-dom';
import { useState, useCallback, useEffect } from 'react';

import { Input } from '../../../components/Input/Input';
import { Alert } from '../../../components/Alert/Alert';
import { CargarFotos } from '../../../components/CargarFotos/CargarFotos';

import { editUser, saveNewImg, getUserData } from '../../../redux/usuario/thunk';

import './EditarUsuario.css';

export const EditarUsuario = () => {

    const { userId } = useParams();

    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const [files, setFiles] = useState();

    const realizarCambios = useCallback(async (files) => {
        let isPerfect = true;

        const approvalTest = {
            'Nombre': (userDetails.nombres.length > 2) && (userDetails.nombres.length < 50),
            'Teléfono': (`${userDetails.telefono}`.length === 10),
            'Rol': !userDetails.rolUsuario.includes('Elige una opción')
        };
        for (let property in approvalTest) {
            if (!approvalTest[property]) {
                isPerfect = false;
                setShowAlert(true);
                setAlert(() => {
                    return {
                        title: `${property} es inválido`,
                        message: 'Por favor corrígelo',
                        type: 'alerta'
                    };
                });
                break;
            }
        }
        if (files.length !== 0) {
            if (files.length > 1) {
                setShowAlert(true);
                setAlert(() => {
                    return {
                        title: 'Solo una foto',
                        message: 'Por favor corrígelo',
                        type: 'alerta'
                    };
                });
                isPerfect = false;
            } else {
                saveNewImg(userId, files[0]);
            }
        }

        if (isPerfect) {
            const [state, response] = await editUser(userId, userDetails);
            if (state) {
                setShowAlert(true);
                setAlert(() => {
                    return {
                        title: 'Operación realizada',
                        message: response,
                        type: 'exito'
                    };
                });
            } else {
                setShowAlert(true);
                setAlert(() => {
                    return {
                        title: 'Operación no realizada',
                        message: response,
                        type: 'error'
                    };
                });
            }
        }
    }, [userDetails, userId]);

    const handleChanges = useCallback((e) => {
        const property = e.target.id;
        const newValue = e.target.value

        setUserDetails((prevValues) => {
            return {
                ...prevValues,
                [property]: newValue,
            };
        })
    }, []);

    useEffect(() => {
        const setUser = async () => {
            const response = await getUserData(userId);
            const currentUser = {
                id: userId,
                nombres: response.nombres,
                telefono: response.telefono,
                rolUsuario: response.rolUsuario,
                imagenPerfil: response.imagenPerfil
            };
            setUserDetails(() => {
                return {
                    ...currentUser
                };
            });
        }
        setUser();
    }, [userId]);

    useEffect(() => {
        const currentUser = {
            id: userId,
            nombres: userDetails.nombres,
            telefono: userDetails.telefono,
            rolUsuario: userDetails.rolUsuario,
            imagenPerfil: userDetails.imagenPerfil,
        };
        setUserDetails(() => {
            return {
                ...currentUser
            };
        });
    }, []);

    return (
        <section className='edit-user'>
            {showAlert ? (
                <Alert
                    title={alert.title}
                    message={alert.message}
                    type={alert.type}
                    setShowModal={setShowAlert}
                />
            ) : null}
            <header className='edit-user__title'>
                <h2>Editar información del usuario {userId}</h2>
            </header>
            <article>
                <div className='app-configuracion__infoUsuario'>
                    {userDetails ? (
                        <div className='user-data__change'>
                            <Input
                                id={'nombres'}
                                labelText={'Nombre del usuario'}
                                value={userDetails.nombres}
                                type={'text'}
                                maxLength={50}
                                minLength={2}
                                onChange={handleChanges}
                                required
                            />
                            <Input
                                id={'telefono'}
                                labelText={'Email del usuario'}
                                value={userDetails.telefono}
                                type={'number'}
                                maxLength={10}
                                minLength={10}
                                required
                                onChange={handleChanges}
                            />
                            <Input
                                id={'rolUsuario'}
                                type={'selection'}
                                labelText={'Rol del usuario'}
                                value={userDetails.rolUsuario}
                                opciones={['ADMIN', 'USER']}
                                onChange={handleChanges}
                                required
                            />

                        </div>
                    ) : null}
                    <div className='user-data__change-pic'>
                        <div className='current-user__profile'>
                            {userDetails.imagenPerfil ? (
                                <img src={!files ? URL.createObjectURL(files[0]) : userDetails.imagenPerfil} alt="" />
                            ) : null}
                        </div>
                        <CargarFotos setFiles={(filesSelected) => setFiles(filesSelected)} />
                    </div>
                    <button
                        className='save-changes app-btn'
                        onClick={() => {realizarCambios(files)}}
                    >
                        Guardar Cambios
                    </button>
                </div>
            </article>
        </section>
    );

};