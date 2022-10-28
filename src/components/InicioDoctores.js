import React, { Component } from 'react'
//importo el axios para consultar la api y hacer el select
import axios from 'axios';
//importo Global para usarlo
import Global from '../Global';
export default class InicioDoctores extends Component {
    cajaSalarioRef = React.createRef();
    cajaSelectRef = React.createRef();
    state = {
        especialidad: [],
        espdoctor: [],
        tabla:[],
        status: false

    }
    loadSelect = () => {
        var request = "api/Doctores/Especialidades";
        var url = Global.urlDoctores + request;
        //hacemos el axios para obtener los datos
        axios.get(url).then(res => {
            this.setState({
                especialidad: res.data,
                status: true
            })
        })

    }
    loadEspecialidad = (e) => {
        e.preventDefault();
        var especialidad = this.cajaSelectRef.current.value;
        this.setState({
            doctores: especialidad,
        })
    
    }
    loadTabla = () =>{
        var aux = this.state.espdoctor;
        var request = "api/Doctores/DoctoresEspecialidad/" + aux;
        var url = Global.urlDoctores + request;
        axios.get(url).then(res => {
            this.setState({
                tabla:res.data
            })
        })
    }

    componentDidMount = () => {
        this.loadSelect();
        this.loadTabla()
    }

    render() {
        if (this.state.status == true) {

        }
        return (
            <div>
                <h1>Incremento salaral Doctores</h1>
                <label>Seleccione una especialidad</label>
                <select>
                    {
                        this.state.status == true &&
                        this.state.especialidad.map((esp, index) => {
                            return (<option key={index} defaultValue={index} ref={this.cajaSelectRef}>{esp}</option>)
                        })
                    }
                </select>

                <label>Incremento salarial</label>
                <input type="text" ref={this.cajaSalarioRef} />
                <button onClick={this.loadEspecialidad}>Cargar</button>
                <table>
                    <thead>
                        <tr>
                            <th>Apellido</th>
                            <th>Especialidad</th>
                            <th>Salario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.statusDoc == true &&
                            this.state.tabla.map((doc, index) => {
                                return (<tr key={index}>
                                    <td>{doc.apellido}</td>
                                    <td>{doc.especialidad}</td>
                                    <td>{doc.salario}</td>
                                </tr>)
                            })
                        }
                    </tbody>

                </table>
            </div>
        )
    }
}
