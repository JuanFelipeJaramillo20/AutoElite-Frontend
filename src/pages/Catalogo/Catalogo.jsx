import { useState, useEffect } from 'react';

import Lottie from 'lottie-react';
import loaderLottie from '../../assets/animations/carLoader.json';

import { CardCar } from '../../components/CardCar/CardCar';
import { Boton } from '../../components/Boton/Boton';
import { Filtro } from './components/Filtro/Filtro';

import './Catalogo.css';
import { useDispatch, useSelector } from 'react-redux';
import { cargarPublicaciones } from '../../redux/publicaciones/thunk';
import { getPublicaciones } from '../../redux/publicaciones/selectors';

export const Catalogo = () => {
  const dispatch = useDispatch();
  const resumenPublicaciones = useSelector(getPublicaciones);
  //para la paginación.
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  //valores default que ayudarán al seleccionar limpiar filtro
  const defaultValuesSelection = {
    ubicacion: 'Seleccione una ubicación',
    year: 'Seleccione un año',
    marca: 'Seleccione una marca',
    modelo: 'Seleccione un modelo',
    estado: { usado: false, nuevo: false },
    combustible: {
      gasolina: false,
      diesel: false,
      hibrido: false,
      electrico: false,
    },
    transmision: {
      automatica: false,
      mecanica: false,
      semiautomatica: false,
      secuencial: false,
      manual: false,
    },
  };
  const [allBrands, setAllBrands] = useState([]);
  const [allModels, setAllModels] = useState([]);

  const [activeFilters, setActiveFilters] = useState({});
  const [filteredPublications, setFilteredPublication] = useState([]);

  const [removeFilter, setRemoveFilter] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValuesSelection);

  const handleSelectionChange = (event) => {
    const { name, value } = event.target;
    setSelectedOption((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckedOption = (nameGroup, opt) => {
    setSelectedOption((prevState) => ({
      ...prevState,
      [nameGroup]: {
        ...Object.fromEntries(
          Object.entries(prevState[nameGroup]).map(([key]) => [key, false])
        ),
        [opt]: true,
      },
    }));
  };
  const addFilter = (newProp, value) => {
    if (value !== null) {
      if (newProp === 'PrecioMax' && isNaN(value)) {
        setActiveFilters((prevFilter) => {
          const filter = { ...prevFilter };
          delete filter[`${newProp}`];
          return filter;
        });
      } else if (newProp === 'PrecioMin' && isNaN(value)) {
        setActiveFilters((prevFilter) => {
          const filter = { ...prevFilter };
          delete filter[`${newProp}`];
          return filter;
        });
      } else if (newProp === 'KilometrajeMin' && isNaN(value)) {
        setActiveFilters((prevFilter) => {
          const filter = { ...prevFilter };
          delete filter[`${newProp}`];
          return filter;
        });
      } else if (newProp === 'KilometrajeMax' && isNaN(value)) {
        setActiveFilters((prevFilter) => {
          const filter = { ...prevFilter };
          delete filter[`${newProp}`];
          return filter;
        });
      } else if (activeFilters[`${newProp}`]) {
        activeFilters[`${newProp}`] = value;
        setActiveFilters((prevFilter) => {
          return {
            ...prevFilter,
            [newProp]: value,
          };
        });
      } else {
        setActiveFilters((prevFilter) => {
          return {
            ...prevFilter,
            [newProp]: value,
          };
        });
      }
    } else {
      setActiveFilters({});
    }
  };

  const removeFilters = () => {
    addFilter('', null);
    setRemoveFilter(true);
    setSelectedOption(defaultValuesSelection);
  };
  // API call to fetch cars data
  useEffect(() => {
    dispatch(cargarPublicaciones());
  }, []);

  //collect all brands and models from cars
  useEffect(() => {
    if (allBrands && allModels) {
      const checkBrands = [];
      const checkModels = [];
      resumenPublicaciones.forEach((publicacion) => {
        if (!checkBrands.includes(publicacion.carroPublicacion['marca'])) {
          checkBrands.push(publicacion.carroPublicacion['marca']);
        }
        if (!checkModels.includes(publicacion.carroPublicacion['tipo'])) {
          checkModels.push(publicacion.carroPublicacion['tipo']);
        }
      });
      setAllBrands(checkBrands);
      setAllModels(checkModels);
    }
  }, [resumenPublicaciones]);

  //set the total pages of the catalog
  useEffect(() => {
    setTotalPages(Math.ceil(resumenPublicaciones.length / carsPerPage));
  }, [resumenPublicaciones]);

  //set the total pages when the filtering is on.
  useEffect(() => {
    setTotalPages(Math.ceil(filteredPublications.length / carsPerPage));
  }, [filteredPublications]);

  //filter
  useEffect(() => {
    const filter = (filtros) => {
      setFilteredPublication(
        resumenPublicaciones.filter((publicacion) => {
          for (let propiedad in filtros) {
            if (propiedad === 'PrecioMax' && filtros['PrecioMax'] > 0) {
              if (
                publicacion.carroPublicacion['precio'] > filtros['PrecioMax']
              ) {
                return false;
              }
            } else if (propiedad === 'PrecioMin' && filtros['PrecioMin'] > 0) {
              if (
                publicacion.carroPublicacion['precio'] < filtros['PrecioMin']
              ) {
                return false;
              }
            } else if (
              propiedad === 'KilometrajeMax' &&
              filtros['KilometrajeMax'] > 0
            ) {
              if (
                publicacion.carroPublicacion['kilometraje'] >
                filtros['KilometrajeMax']
              ) {
                return false;
              }
            } else if (
              propiedad === 'KilometrajeMin' &&
              filtros['KilometrajeMin'] > 0
            ) {
              if (
                publicacion.carroPublicacion['kilometraje'] <
                filtros['KilometrajeMin']
              ) {
                return false;
              }
            } else if (
              publicacion.carroPublicacion[propiedad] !== filtros[propiedad]
            ) {
              return false;
            }
          }
          return true;
        })
      );
      setCurrentPage(1);
    };
    if (removeFilter || Object.keys(activeFilters).length > 0) {
      filter(activeFilters);
      setRemoveFilter(false);
    }
  }, [activeFilters, resumenPublicaciones, removeFilter]);

  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentPublications =
    filteredPublications.length > 0
      ? filteredPublications.slice(indexOfFirstCar, indexOfLastCar)
      : resumenPublicaciones.slice(indexOfFirstCar, indexOfLastCar);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className='catalog-page'>
        <div className='columna-filtros'>
          <div className='remove-filters'>
            <Boton texto={'Limpiar filtro'} onClick={removeFilters} />
          </div>
          <div className='contenedor-botones-filtros'>
            <label title='Estado' className='catalog-label'>
              Estado:
            </label>
            <li>
              <label htmlFor='Nuevo' className='input-label input-estado'>
                <input
                  type='radio'
                  id='Nuevo'
                  name='estado'
                  value='Nuevo'
                  className='checkbox-input'
                  checked={selectedOption.estado.nuevo}
                  onChange={() => {
                    addFilter('Usado', false);
                    handleCheckedOption('estado', 'nuevo');
                  }}
                />
                Nuevo
              </label>
              <label htmlFor='Usado' className='input-label input-estado'>
                <input
                  type='radio'
                  id='Usado'
                  name='estado'
                  value='Usado'
                  className='checkbox-input'
                  checked={selectedOption.estado.usado}
                  onChange={() => {
                    addFilter('Usado', true);
                    handleCheckedOption('estado', 'usado');
                  }}
                />
                Usado
              </label>
            </li>
          </div>

          <label className='catalog-label'>Tus filtros activos:</label>
          <Filtro tagsActivados={activeFilters} />
          <label className='catalog-label' htmlFor='ubicacion'>
            Ubicación:
          </label>
          <select
            name='ubicacion'
            id='ubicacion'
            value={selectedOption.ubicacion}
            className='dropdown-menu-catalogo'
            onChange={(event) => {
              addFilter('ciudad', event.target.value);
              handleSelectionChange(event);
            }}
          >
            <option value=''>Seleccione una ubicación</option>
            {resumenPublicaciones.map((publicacion) => (
              <option
                value={publicacion.carroPublicacion.ciudad}
                key={publicacion.carroPublicacion.ciudad + Math.random()}
              >
                {publicacion.carroPublicacion.ciudad}
              </option>
            ))}
          </select>
          <label className='catalog-label' htmlFor='year'>
            Año:
          </label>
          <select
            name='year'
            id='year'
            className='dropdown-menu-catalogo'
            value={selectedOption.year}
            onChange={(event) => {
              addFilter('year', event.target.value);
              handleSelectionChange(event);
            }}
          >
            <option value=''>Seleccione un año</option>
            {resumenPublicaciones.map((publicacion) => (
              <option
                value={publicacion.carroPublicacion.year}
                key={publicacion.carroPublicacion.year + Math.random()}
              >
                {publicacion.carroPublicacion.year}
              </option>
            ))}
          </select>

          <label className='catalog-label'>Marca y Modelo:</label>
          <select
            name='marca'
            id='marca'
            className='dropdown-menu-catalogo'
            value={selectedOption.marca}
            onChange={(event) => {
              addFilter('marca', event.target.value);
              handleSelectionChange(event);
            }}
          >
            <option value=''>Seleccione una marca</option>
            {allBrands.map((marca) => (
              <option value={marca} key={marca}>
                {marca}
              </option>
            ))}
          </select>

          <select
            name='modelo'
            id='modelo'
            className='dropdown-menu-catalogo'
            value={selectedOption.modelo}
            onChange={(event) => {
              addFilter('tipo', event.target.value);
              handleSelectionChange(event);
            }}
          >
            <option value=''>Seleccione un modelo</option>
            {allModels.map((modelo) => (
              <option value={modelo} key={modelo}>
                {modelo}
              </option>
            ))}
          </select>

          <label className='catalog-label'>Precio:</label>
          <div className='contenedor-horizontal'>
            <input
              type='number'
              className='input-precio'
              placeholder='Min...'
              onChange={(event) => {
                addFilter('PrecioMin', parseInt(event.target.value));
              }}
            ></input>
            <input
              type='number'
              className='input-precio'
              placeholder='Max...'
              onChange={(event) => {
                addFilter('PrecioMax', parseInt(event.target.value));
              }}
            ></input>
          </div>

          <label className='catalog-label'>Tipo de combustible:</label>
          <li>
            <label htmlFor='Gasolina' className='input-label input-combustible'>
              <input
                type='radio'
                id='Gasolina'
                name='combustible'
                value='Gasolina'
                className='checkbox-input'
                checked={selectedOption.combustible.gasolina}
                onChange={(event) => {
                  addFilter('combustible', event.target.value);
                  handleCheckedOption('combustible', 'gasolina');
                }}
              />
              Gasolina
            </label>
            <label htmlFor='Diesel' className='input-label input-combustible'>
              <input
                type='radio'
                id='Diesel'
                name='combustible'
                value='Diesel'
                className='checkbox-input'
                checked={selectedOption.combustible.diesel}
                onChange={(event) => {
                  addFilter('combustible', event.target.value);
                  handleCheckedOption('combustible', 'diesel');
                }}
              />
              Diesel
            </label>
            <label htmlFor='Hibrido' className='input-label input-combustible'>
              <input
                type='radio'
                id='Hibrido'
                name='combustible'
                value='Hibrido'
                className='checkbox-input'
                checked={selectedOption.combustible.hibrido}
                onChange={(event) => {
                  addFilter('combustible', event.target.value);
                  handleCheckedOption('combustible', 'hibrido');
                }}
              />
              Híbrido
            </label>
            <label
              htmlFor='Eléctrico'
              className='input-label input-combustible'
            >
              <input
                type='radio'
                id='Eléctrico'
                name='combustible'
                value='Eléctrico'
                className='checkbox-input'
                checked={selectedOption.combustible.electrico}
                onChange={(event) => {
                  addFilter('combustible', event.target.value);
                  handleCheckedOption('combustible', 'electrico');
                }}
              />
              Eléctrico
            </label>
          </li>

          <label className='catalog-label'>Transmisión:</label>
          <li>
            <label
              htmlFor='Automatica'
              className='input-label input-transmision'
            >
              <input
                type='radio'
                id='Automatica'
                name='transmision'
                value='Automatica'
                checked={selectedOption.transmision.automatica}
                className='checkbox-input'
                onChange={(event) => {
                  addFilter('transmision', event.target.value);
                  handleCheckedOption('transmision', 'automatica');
                }}
              />
              Automática
            </label>
            <label htmlFor='Mecanica' className='input-label input-transmision'>
              <input
                type='radio'
                id='Mecanica'
                name='transmision'
                value='Mecanica'
                checked={selectedOption.transmision.mecanica}
                className='checkbox-input'
                onChange={(event) => {
                  addFilter('transmision', event.target.value);
                  handleCheckedOption('transmision', 'mecanica');
                }}
              />
              Mecánica
            </label>
            <label
              htmlFor='Semiautomatica'
              className='input-label input-transmision'
            >
              <input
                type='radio'
                id='Semiautomatica'
                name='transmision'
                value='Semiautomatica'
                checked={selectedOption.transmision.semiautomatica}
                className='checkbox-input'
                onChange={(event) => {
                  addFilter('transmision', event.target.value);
                  handleCheckedOption('transmision', 'semiautomatica');
                }}
              />
              Semiautomática
            </label>
            <label
              htmlFor='Secuencial'
              className='input-label input-transmision'
            >
              <input
                type='radio'
                id='Secuencial'
                name='transmision'
                value='Secuencial'
                checked={selectedOption.transmision.secuencial}
                className='checkbox-input'
                onChange={(event) => {
                  addFilter('transmision', event.target.value);
                  handleCheckedOption('transmision', 'secuencial');
                }}
              />
              Secuencial
            </label>
            <label htmlFor='Manual' className='input-label input-transmision'>
              <input
                type='radio'
                id='Manual'
                name='transmision'
                value='Manual'
                checked={selectedOption.transmision.manual}
                className='checkbox-input'
                onChange={(event) => {
                  addFilter('transmision', event.target.value);
                  handleCheckedOption('transmision', 'manual');
                }}
              />
              Manual
            </label>
          </li>

          <label className='catalog-label'>Kilometraje:</label>
          <div className='contenedor-horizontal'>
            <input
              type='number'
              className='input-precio'
              placeholder='Min...'
              onChange={(event) => {
                addFilter('KilometrajeMin', parseInt(event.target.value));
              }}
            ></input>
            <input
              type='number'
              className='input-precio'
              placeholder='Max...'
              onChange={(event) => {
                addFilter('KilometrajeMax', parseInt(event.target.value));
              }}
            ></input>
          </div>
          {/* Add more filter options based on your requirements */}
        </div>
        <div className='catalog-page__column2'>
          <div className='car-list'>
            {resumenPublicaciones.length === 0 ? (
              <>
                <Lottie className='loader-cars' animationData={loaderLottie} />
              </>
            ) : (
              <>
                {filteredPublications.length < 1 ? (
                  Object.keys(activeFilters).length !== 0 ? (
                    <p>No hay vehiculos que coincidan con los filtros</p>
                  ) : (
                    currentPublications.map((publicacion) => (
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
                      ></CardCar>
                    ))
                  )
                ) : (
                  filteredPublications
                    .slice(indexOfFirstCar, indexOfLastCar)
                    .map((publicacion) => (
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
                      ></CardCar>
                    ))
                )}
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
    </>
  );
};
