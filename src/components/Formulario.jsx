import React from 'react'

const Formulario = () => {
    return (
        <div className='container mt-5'>
            <h1 className="text-cent">CRUD DE BEBIDAS</h1>
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
                    <h4 className="text-center">Agregar Bebidas</h4>
                </div>
            </div>
        </div>
    )
}

export default Formulario