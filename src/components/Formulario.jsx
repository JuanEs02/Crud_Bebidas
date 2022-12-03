import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'

const Formulario = () => {

    const [listaBebidas, setListaBebidas] = useState([])
    const [id, setId] = useState(0)
    const [modoEdicion, setModoEdicion] = useState(false)

    const [nombrebebida, setNombreBebida] = useState('')
    const [tipobebida, setTipoBebida] = useState('Gaseosa')
    const [descripcionbebida, setDescripcionBebida] = useState('')
    const [saborbebida, setSaborBebida] = useState('')
    const [preciobebida, setPrecioBebida] = useState('')
    const [cantidadbebida, setCantidadBebida] = useState('')
    const [distribuidorbebida, setDistribuidorBebida] = useState('')
    const [envasebebida, setEnvaseBebida] = useState('Vidrio')
    const [imagenaleatoria, setImagenAleatoria] = useState('https://picsum.photos/200/299')

    function isAllComplete() {
        if (!nombrebebida.trim()) {
            alert('Agregue un nombre a la bebida')
            return false;
        }

        if (!descripcionbebida.trim()) {
            alert('Agrega una descripción a la bebida')
            return false;
        }

        if (!saborbebida.trim()) {
            alert('Agregue un sabor a la bebida')
            return false;
        }

        if (!preciobebida.trim()) {
            alert('Ingrese un precio a la bebida')
            return false;
        }

        if (!cantidadbebida.trim()) {
            alert('Agregue una cantidad a la bebida entre 150ml a 300ml')
            return false;
        }

        if (!distribuidorbebida.trim()) {
            alert('Agregue un distribuidor a la bebida')
            return false;
        }

        return true;
    }

    function positivePrice() {
        if (preciobebida <= 0) {
            alert('El precio de la bebida de ser mayor a 0')
            return false;
        }
        return true;
    }

    function litros() {
        if (cantidadbebida < 150) {
            alert('La cantidad minima de litros por bebida es de 150ml')
            return false;
        } else if (cantidadbebida > 300) {
            alert('La cantidad maxima de litros por bebida es de 300ml')
            return false;
        }
        return true;
    }

    function typeDrink(e) {
        setTipoBebida(e.target.value);
    }

    function materialDrink(e) {
        setEnvaseBebida(e.target.value);
    }

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                await onSnapshot(collection(db, 'bebidas'), (query) => {
                    setListaBebidas(query.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                })
            } catch (error) {
                console.log(error)
            }
        }
        obtenerDatos();
    }, [])

    const eliminar = async id => {
        try {
            await deleteDoc(doc(db, 'bebidas', id))
        } catch (error) {
            console.log(error)
        }
    }

    const editar = item => {
        setNombreBebida(item.nombreBebida)
        setTipoBebida(item.tipoBebida)
        setDescripcionBebida(item.descripcionBebida)
        setSaborBebida(item.saborBebida)
        setPrecioBebida(item.precioBebida)
        setCantidadBebida(item.cantidadBebida)
        setDistribuidorBebida(item.distribuidorBebida)
        setEnvaseBebida(item.envaseBebida)
        setImagenAleatoria(item.imagenAleatoria)
        setId(item.id)
        setModoEdicion(true)
    }

    const editarBebidas = async e => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'bebidas', id);
            await updateDoc(docRef, {
                nombreBebida: nombrebebida,
                tipoBebida: tipobebida,
                descripcionBebida: descripcionbebida,
                saborBebida: saborbebida,
                precioBebida: preciobebida,
                cantidadBebida: cantidadbebida,
                distribuidorBebida: distribuidorbebida,
                envaseBebida: envasebebida,
                imagenAleatoria: imagenaleatoria
            })

            const nuevoArray = listaBebidas.map(
                item => item.id === id ? {
                    id: id,
                    nombreBebida: nombrebebida,
                    tipoBebida: tipobebida,
                    descripcionBebida: descripcionbebida,
                    saborBebida: saborbebida,
                    precioBebida: preciobebida,
                    cantidadBebida: cantidadbebida,
                    distribuidorBebida: distribuidorbebida,
                    envaseBebida: envasebebida,
                    imagenAleatoria: imagenaleatoria
                } : item
            )

            setListaBebidas(nuevoArray)
            setModoEdicion(false)
            setNombreBebida('')
            setTipoBebida('')
            setDescripcionBebida('')
            setSaborBebida('')
            setPrecioBebida('')
            setCantidadBebida('')
            setDistribuidorBebida('')
            setEnvaseBebida('')
            setId('')
            setImagenAleatoria('')
        } catch (error) {
            console.log(error)
        }
    }

    const cancelar = () => {
        setModoEdicion(false)
        setNombreBebida('')
        setTipoBebida('')
        setDescripcionBebida('')
        setSaborBebida('')
        setPrecioBebida('')
        setCantidadBebida('')
        setDistribuidorBebida('')
        setEnvaseBebida('')
        setId('')
        setImagenAleatoria('')
    }

    const guardarBebidas = async (e) => {
        e.preventDefault()

        const nombreB = document.getElementById("nombrebebida").value;
        const descripcionB = document.getElementById("descripcionbebida").value;
        const saborB = document.getElementById("saborbebida").value;
        const precioB = document.getElementById("preciobebida").value;
        const cantidadB = document.getElementById("cantidadbebida").value;
        const distribuidorB = document.getElementById("distribuidorbebida").value;

        if (!isAllComplete(nombreB, descripcionB, saborB, precioB, cantidadB,
            distribuidorB) || !positivePrice(precioB) || !litros(cantidadB)) {
            return;
        }

        const valores = {
            nombreBebida: nombrebebida,
            tipoBebida: tipobebida,
            descripcionBebida: descripcionbebida,
            saborBebida: saborbebida,
            precioBebida: preciobebida,
            cantidadBebida: cantidadbebida,
            distribuidorBebida: distribuidorbebida,
            envaseBebida: envasebebida,
            imagenAleatoria: imagenaleatoria
        }

        const data = await addDoc(collection(db, 'bebidas'), valores)

        setListaBebidas([...listaBebidas,
        {
            nombreBebida: nombrebebida,
            tipoBebida: tipobebida,
            descripcionBebida: descripcionbebida,
            saborBebida: saborbebida,
            precioBebida: preciobebida,
            cantidadBebida: cantidadbebida,
            distribuidorBebida: distribuidorbebida,
            envaseBebida: envasebebida,
            id: data.id,
            imagenAleatoria: imagenaleatoria
        }])

        setNombreBebida('')
        setTipoBebida('')
        setDescripcionBebida('')
        setSaborBebida('')
        setPrecioBebida('')
        setCantidadBebida('')
        setDistribuidorBebida('')
        setEnvaseBebida('')
        setImagenAleatoria('https://picsum.photos/200/299')

    }

    return (
        <div className='container mt-5'>
            <h1 className="text-center">CRUD DE BEBIDAS</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Lista de Bebidas</h4>
                    <ul className="list-group">
                        {
                            listaBebidas.map(item => (
                                <li className="list-group-item" key={item.id}>
                                    <div className="container text-left">
                                        <div className="row">
                                            <div className="col" >
                                                <span className="lead">
                                                    Nombre: {item.nombreBebida}<br>
                                                    </br>Tipo: {item.tipoBebida}<br>
                                                    </br>Descripcion: {item.descripcionBebida}<br>
                                                    </br>Sabor: {item.saborBebida}<br>
                                                    </br>Precio: {item.precioBebida}<br>
                                                    </br>Cantidad: {item.cantidadBebida}ml<br>
                                                    </br>Distribuidor: {item.distribuidorBebida}<br>
                                                    </br>Material del envase: {item.envaseBebida}<br>
                                                    </br><br></br>
                                                    <button className="btn btn-secondary btn-sm fload-end mx-2" onClick={() => eliminar(item.id)}>Eliminar</button>
                                                    <button className="btn btn-info btn-sm fload-end" onClick={() => editar(item)}>Editar</button>
                                                </span>
                                            </div>
                                            <div className="col text-center">
                                                <img className="img-fluid img-thumbnail rounded" src={item.imagenAleatoria} alt="" />
                                            </div>
                                        </div>

                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-4">
                    <div className='text-center'>
                        <h4 className="text-center">{modoEdicion ? 'Editar Bebidas' : 'Agregar Bebidas'}</h4>
                        <form onSubmit={modoEdicion ? editarBebidas : guardarBebidas}>

                            <input type="text"
                                id="nombrebebida"
                                className="form-control mb-2"
                                placeholder='Ingrese el nombre de la Bebida'
                                value={nombrebebida}
                                onChange={(e) => setNombreBebida(e.target.value)} />

                            <select id="tipobebida" value={tipobebida} className="form-select mb-2" aria-label="Default select example"
                                onChange={e => typeDrink(e)}>

                                <option value="Gaseosa" name="Gaseosa">Gaseosa</option>
                                <option value="Jugo" name="Jugo">Jugo</option>
                                <option value="Cerveza" name="Cerveza">Cerveza</option>
                                <option value="Agua" name="Agua">Agua</option>

                            </select>

                            <input type="text"
                                id="descripcionbebida"
                                className="form-control mb-2"
                                placeholder='Ingrese la descripción de la Bebida'
                                value={descripcionbebida}
                                onChange={(e) => setDescripcionBebida(e.target.value)} />

                            <input type="text"
                                id="saborbebida"
                                className="form-control mb-2"
                                placeholder='Ingrese el sabor de la bebida'
                                value={saborbebida} onChange={(e) => setSaborBebida(e.target.value)} />
                                
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">$</span>
                                <input type="text"
                                    id="preciobebida"
                                    className="form-control"
                                    placeholder='Ingrese el precio de la Bebida'
                                    value={preciobebida}
                                    onChange={(e) => setPrecioBebida(e.target.value)} />
                            </div>

                            <div class="input-group mb-3">
                                <input type="text"
                                    id="cantidadbebida"
                                    className="form-control"
                                    placeholder='Ingrese la cantidad de la Bebida'
                                    value={cantidadbebida}
                                    onChange={(e) => setCantidadBebida(e.target.value)} />
                                <span class="input-group-text">ml</span>
                            </div>

                            <input type="text"
                                id="distribuidorbebida"
                                className="form-control mb-2"
                                placeholder='Ingrese el distribuidor de la Bebida'
                                value={distribuidorbebida}
                                onChange={(e) => setDistribuidorBebida(e.target.value)} />

                            <select id="envasebebida" value={envasebebida} className="form-select mb-2" aria-label="Default select example"
                                onChange={e => materialDrink(e)}>

                                <option value="Vidrio" name="Vidrio">Vidrio</option>
                                <option value="Plastico" name="Plastico">Plastico</option>
                                <option value="Lata" name="Lata">Lata</option>
                                <option value="Carton" name="Carton">Carton</option>

                            </select>

                            <input type="text"
                                className='form-control mb-2'
                                placeholder='https://picsum.photos/200/299'
                                value='https://picsum.photos/200/299'

                                onChange={(e) => setImagenAleatoria(e.target.value)} />

                            {
                                modoEdicion ?
                                    (
                                        <>
                                            <button className="btn btn-info col-12 m-1" on='submit'>Editar</button>
                                            <button className="btn btn-danger col-12 m-1" onClick={() => cancelar()}>Cancelar</button>
                                        </>
                                    ) :
                                    <button className="btn btn-success col-12 m-1" on='submit'>Agregar</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Formulario