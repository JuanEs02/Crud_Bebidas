import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, doc, addDoc } from 'firebase/firestore'

const Formulario = () => {

    const [listaBebidas, setListaBebidas] = useState([])
    const [nombrebebida, setBebida] = useState('')
    const [tipobebida, setTipoBebida] = useState('')
    const [descripcionbebida, setDescripcion] = useState('')
    const [saborbebida, setSaborBebida] = useState('')
    const [preciobebida, setPrecioBebida] = useState('')
    const [cantidadbebida, setCantidadBebida] = useState('')
    const [distribuidorbebida, setDistribuidorBebida] = useState('')
    const [envasebebida, setEnvaseBebida] = useState('')

    const guardarBebidas = async (e) => {
        e.preventDefault()

        if (!nombrebebida.trim()) {
            console.log('test')
            return;
        }

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

            setBebida('')
            setTipoBebida('')
            setDescripcion('')
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
                        <li className="list-group-item">Bebida 1</li>
                        <li className="list-group-item">Bebida 2</li>
                    </ul>
                </div>
                <div className="col-4">
                    <div className=''>
                        <h4 className="text-center">Agregar Bebidas</h4>
                        <form onSubmit={guardarBebidas}>

                            <input type="text"
                                className="form-control mb-2"
                                placeholder='Ingrese el nombre de la Bebida'
                                value={nombrebebida}
                                onChange={(e) => setBebida(e.target.value)} />

                            <input type="text"
                                className="form-control mb-2"
                                placeholder='Ingrese el tipo de la Bebida'
                                value={tipobebida}
                                onChange={(e) => setTipoBebida(e.target.value)} />

                            <input type="text"
                                className="form-control mb-2"
                                placeholder='Ingrese la descripción de la Bebida'
                                value={descripcionbebida}
                                onChange={(e) => setDescripcion(e.target.value)} />

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


                            <button className="btn btn-success col-12 m-1" on='submit'>Agregar</button>


                        </form>
                        <button className="btn btn-danger col-12 m-1">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Formulario