import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import axios from "axios";

const API = "http://localhost:5000/film/pelicula";

class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: "",
      resumen: "",
      categoria: "",
      valorBoleto: "",
      imagen: "",
      estado: true,
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ imagen: reader.result });
      // console.log(reader.result);
    };
    reader.readAsDataURL(file);
  };

  saveData = (e) => {
    e.preventDefault();
    this.post = {
      datos: {
        titulo: this.state.titulo,
        resumen: this.state.resumen,
        categoria: this.state.categoria,
        valorBoleto: this.state.valorBoleto,
        imagen: this.state.imagen,
        estado: this.state.estado,
      },
    };

    if (
      this.post.datos.titulo === "" ||
      this.post.datos.resumen === "" ||
      this.post.datos.categoria === "" ||
      this.post.datos.valorBoleto === "" ||
      this.post.datos.imagen === ""
    ) {
      alert("Complete todos los datos para continuar...");
    } else {
      axios
        .post(API, this.post)
        .then((response) => {
          if (response.data.ok === true) {
            this.props.history.push("/movies");
            // window.location.assign("http://localhost:3000/movies");
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  render() {
    const { titulo, resumen, categoria, valorBoleto, imagen } = this.state;
    return (
      <div className="flex">
        <div className="flex w-1/5 border-r-2 h-screen px-6">
          <Sidebar />
        </div>

        <div className="w-full">
          <div>
            <Header />
          </div>
          <div className="flex flex-col px-12">
            <p className="my-5 text-2xl">Agregar nueva pelicula.</p>
            <form
              className="bg-white shadow-md rounded px-8 py-4 mb-4 flex flex-col my-2 mx-8"
              onSubmit={this.saveData}
            >
              <div className="flex">
                <div className="flex flex-col w-3/4 mb-4">
                  <div className="w-full px-2">
                    <label
                      className="block uppercase tracking-wide text-xs font-bold mb-2"
                      htmlFor="titulo"
                    >
                      Título
                    </label>
                    <input
                      className="appearance-none block w-full border rounded py-3 px-4 mb-3"
                      type="text"
                      placeholder="Ej: El Viaje al Centro de la Tierra"
                      name="titulo"
                      value={titulo}
                      onChange={this.changeHandler}
                      autoComplete="off"
                    />
                  </div>
                  <div className="-mx-3 md:flex mb-6 ">
                    <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-xs font-bold mb-2"
                        htmlFor="resumen"
                      >
                        Resumen
                      </label>
                      <textarea
                        className="appearance-none block w-full border rounded py-3 px-4 mb-3"
                        type="text"
                        placeholder="Sinopsis de la película"
                        name="resumen"
                        value={resumen}
                        onChange={this.changeHandler}
                        autoComplete="off"
                      />
                    </div>
                    <div className="md:w-1/3 px-3">
                      <label
                        className="block uppercase tracking-wide text-xs font-bold mb-2"
                        htmlFor="categoria"
                      >
                        Categoria
                      </label>
                      <input
                        className="appearance-none block w-full border rounded py-3 px-4 mb-3"
                        type="text"
                        placeholder="Ej: Comedia"
                        name="categoria"
                        value={categoria}
                        onChange={this.changeHandler}
                        autoComplete="off"
                      />
                    </div>
                    <div className="md:w-1/3 px-3">
                      <label
                        className="block uppercase tracking-wide text-xs font-bold mb-2"
                        htmlFor="valorBoleto"
                      >
                        Valor del Boleto
                      </label>
                      <input
                        className="appearance-none block w-full border rounded py-3 px-4 mb-3"
                        type="text"
                        placeholder="Ej: 3.50"
                        name="valorBoleto"
                        value={valorBoleto}
                        onChange={this.changeHandler}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-1/4">
                  <div className="px-3">
                    <label
                      className="block uppercase tracking-wide text-xs font-bold mb-2"
                      htmlFor="imagen"
                    >
                      Portada
                    </label>
                    <input
                      className="appearance-none block w-full border rounded py-3 px-4 mb-3"
                      name="imagen"
                      type="file"
                      defaultValue={imagen}
                      onChange={this.onFileChange}
                    />
                  </div>
                  <div className="px-1">
                    {imagen ? (
                      <img alt="preview" className="w-64 h-64" src={imagen} />
                    ) : null}
                  </div>
                </div>
              </div>
              <p className="text-red text-xs italic">
                Por favor complete todos los campos.
              </p>
              <div className="mt-4 text-center">
                <button
                  className="bg-white text-gray-800 font-bold rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-3 inline-flex items-center"
                  type="submit"
                >
                  <i className="fas fa-save mr-2"></i>
                  Grabar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AddMovie);