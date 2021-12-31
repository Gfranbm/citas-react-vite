import { useState, useEffect } from "react"; 
import Error from "./Error"

const Formulario = ({pacientes ,setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] =  useState('');
  const [propietario, setPropietario] =  useState('');
  const [email, setEmail] =  useState('');
  const [fecha, setFecha] =  useState('');
  const [sintomas, setSintomas] =  useState('');

  const [error, setError] =  useState(false);

  useEffect( ()=>{
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
   
    }
  }, [paciente])


  const generarId = () =>{
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)

    return random + fecha
  }

  const handleSubmit = (e) =>{
    e.preventDefault()


    //validacion del formulario

    if([nombre, propietario, email, fecha, sintomas].includes('')){
      setError(true)
      return;
    }
      setError(false)    

      //objeto de Paciente
      const objetoPaciente = {
        nombre,
        propietario,
        email, 
        fecha, 
        sintomas
      }

      if(paciente.id){
        //Editando registro
        objetoPaciente.id = paciente.id
        const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? 
          objetoPaciente : pacienteState )

          setPacientes(pacientesActualizados)
          setPaciente({})
      }else{
        //nuevo registro
        objetoPaciente.id = generarId()
        setPacientes([...pacientes, objetoPaciente])
      }

      

      //reinicia el formulario
      setNombre('')
      setPropietario('')
      setEmail('')
      setFecha('')
      setSintomas('')
  }
  return(
    <div className="md:w-1/2 lg:w-2/5">
        <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">Añade pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span></p>

        <form 
        onSubmit = {handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5">

           {error && <Error><p>Todos los campos son Obligatorios</p></Error>  }

            <div className="mb-5">
              <label htmlFor="nombre" className="block text-gray-700 uppercase font-bold">
                Nombre Mascota:
                </label>
              <input
              id="nombre"
              type="text"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Nombre de la mascota"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                Nombre Propietario:
                </label>
              <input
              id="mascota"
              type="text"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="Nombre del propietario" 
              value={propietario}
              onChange={(e) => setPropietario(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                E-mail:
                </label>
              <input
              id="email"
              type="email"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              placeholder="E-mail contacto propietario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="mb-5">
              <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                Alta:
                </label>
              <input
              id="alta"
              type="date"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            <div className="mb-5">
              <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                Sintomas:
                </label>
             <textarea
              id="sintomas" 
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
              />
            </div>

            <input
            className="w-full font-bold uppercase text-white bg-indigo-600 p-3 
            hover:bg-indigo-700 cursor-pointer transition-all"
            type="submit"
            value={paciente.id ? 'Editar Paciente': 'Agregar Paciente'}
             />      
        </form>

    </div>
  )
   
}

export default Formulario;
