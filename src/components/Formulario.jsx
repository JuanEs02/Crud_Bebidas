import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, doc, addDoc, onSnapshot, deleteDoc , updateDoc} from 'firebase/firestore'

const Formulario = () => {

    const [listaBebidas, setListaBebidas] = useState([])
    const [id, setId] = useState(0)
    const [modoEdicion, setModoEdicion] = useState(false)

    const [nombrebebida, setNombreBebida] = useState('')
    const [tipobebida, setTipoBebida] = useState('')
    const [descripcionbebida, setDescripcionBebida] = useState('')
    const [saborbebida, setSaborBebida] = useState('')
    const [preciobebida, setPrecioBebida] = useState('')
    const [cantidadbebida, setCantidadBebida] = useState('')
    const [distribuidorbebida, setDistribuidorBebida] = useState('')
    const [envasebebida, setEnvaseBebida] = useState('')

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
        setId(item.id)
        setModoEdicion(true)
    }

    const editarBebidas = async e => {
        e.preventDefault();
        try{
            const docRef = doc(db, 'bebidas', id);
            await updateDoc(docRef,{
                nombreBebida: nombrebebida,
                tipoBebida: tipobebida,
                descripcionBebida: descripcionbebida,
                saborBebida: saborbebida,
                precioBebida: preciobebida,
                cantidadBebida: cantidadbebida,
                distribuidorBebida: distribuidorbebida,
                envaseBebida: envasebebida
            })

            const nuevoArray = listaBebidas.map(
                item => item.id ===id ? {id:id,
                    nombreBebida: nombrebebida,
                    tipoBebida: tipobebida,
                    descripcionBebida: descripcionbebida,
                    saborBebida: saborbebida,
                    precioBebida: preciobebida,
                    cantidadBebida: cantidadbebida,
                    distribuidorBebida: distribuidorbebida,
                    envaseBebida: envasebebida
                }:item
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
        }catch(error){
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
    }

    const guardarBebidas = async (e) => {
        e.preventDefault()

        try {
            const valores = {
                nombreBebida: nombrebebida,
                tipoBebida: tipobebida,
                descripcionBebida: descripcionbebida,
                saborBebida: saborbebida,
                precioBebida: preciobebida,
                cantidadBebida: cantidadbebida,
                distribuidorBebida: distribuidorbebida,
                envaseBebida: envasebebida
            }

            const data = await addDoc(collection(db, 'bebidas'), valores)

            setListaBebidas = (
                [...listaBebidas,
                {
                    nombreBebida: nombrebebida,
                    tipoBebida: tipobebida,
                    descripcionBebida: descripcionbebida,
                    saborBebida: saborbebida,
                    precioBebida: preciobebida,
                    cantidadBebida: cantidadbebida,
                    distribuidorBebida: distribuidorbebida,
                    envaseBebida: envasebebida,
                    id: data.id
                }]
            )

            setNombreBebida('')
            setTipoBebida('')
            setDescripcionBebida('')
            setSaborBebida('')
            setPrecioBebida('')
            setCantidadBebida('')
            setDistribuidorBebida('')
            setEnvaseBebida('')

        } catch (error) {
            console.log(error)
        }
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
                                    <span className="lead">
                                    Nombre: {item.nombreBebida}<br>
                                    </br>Tipo: {item.tipoBebida}<br>
                                    </br>Descripcion: {item.descripcionBebida}<br>
                                    </br>Sabor: {item.saborBebida}<br>
                                    </br>Precio: {item.precioBebida}<br>
                                    </br>Cantidad: {item.cantidadBebida}ml<br>
                                    </br>Distribuidor: {item.distribuidorBebida}<br>
                                    </br>Mat.Envase: {item.envaseBebida}<br>
                                    </br><br></br>
                                        <button className="btn btn-secondary btn-sm fload-end mx-2" onClick={() => eliminar(item.id)}>Eliminar</button>
                                        <button className="btn btn-info btn-sm fload-end" onClick={() => editar(item)}>Editar</button>
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-4">
                    <div className=''>
                        <h4 className="text-center">{modoEdicion ? 'Editar Bebidas' : 'Agregar Bebidas'}</h4>
                        <form onSubmit={modoEdicion ? editarBebidas : guardarBebidas}>

                            <input type="text"
                                className="form-control mb-2"
                                placeholder='Ingrese el nombre de la Bebida'
                                value={nombrebebida}
                                onChange={(e) => setNombreBebida(e.target.value)} />

                            <input type="text"
                                className="form-control mb-2"
                                placeholder='Ingrese el tipo de la Bebida'
                                value={tipobebida}
                                onChange={(e) => setTipoBebida(e.target.value)} />

                            <input type="text"
                                className="form-control mb-2"
                                placeholder='Ingrese la descripción de la Bebida'
                                value={descripcionbebida}
                                onChange={(e) => setDescripcionBebida(e.target.value)} />

                            <input type="text"
                                className="form-control mb-2"
                                placeholder='Ingrese el sabor de la bebida'
                                value={saborbebida} onChange={(e) => setSaborBebida(e.target.value)} />

                            <input type="text"
                                className="form-control mb-2"
                                placeholder='Ingrese el precio de la Bebida'
                                value={preciobebida}
                                onChange={(e) => setPrecioBebida(e.target.value)} />

                            <input type="text"
                                className="form-control mb-2"
                                placeholder='Ingrese la cantidad de la Bebida'
                                value={cantidadbebida}
                                onChange={(e) => setCantidadBebida(e.target.value)} />

                            <input type="text"
                                className="form-control mb-2"
                                placeholder='Ingrese el distribuidor de la Bebida'
                                value={distribuidorbebida}
                                onChange={(e) => setDistribuidorBebida(e.target.value)} />
                            <input type="text"
                                className="form-control mb-2"
                                placeholder='Ingrese el material del envase de la Bebida'
                                value={envasebebida}
                                onChange={(e) => setEnvaseBebida(e.target.value)} />

                            {
                                modoEdicion ?
                                    (
                                        <>
                                            <button className="btn btn-info col-12 m-1" on='submit'>Editar</button>
                                            <button className="btn btn-danger col-12 m-1" onClick={()=>cancelar()}>Cancelar</button>
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