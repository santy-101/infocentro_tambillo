/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  home: function (req, res) {

    return res.view('vistas/home')
  },
  crearLibro: function (req, res) {
    return res.view('Libro/crearLibro');
  },
  error: function (req, res) {
    return res.view('vistas/Error', {
      error: {
        descripcion: "Usted está por error en esta Ruta. Diríjase a Inicio",
        rawError: "Ruta equivocada",
        url: "/Inicio"
      }
    });
  },
  listarLibros: function (req, res) {
    Libro.find()
      .exec(function (errorIndefinido, librosEncontrados) {

        if (errorIndefinido) {
          res.view('vistas/Error', {
            error: {
              descripcion: "Hubo un problema cargando los libros",
              rawError: errorIndefinido,
              url: "/listarLibros"
            }
          });
        }

        res.view('Libro/listarLibros', {
          libros: librosEncontrados
        });
      })
  },
  buscarLibros: function (req, res) {
    return res.view('Libro/buscarLibros');
  },
  editarLibro: function (req, res) {
    var parametros = req.allParams();
    if (parametros.id) {
      Libro.findOne({
        id: parametros.id
      }).exec(function (errorInesperado, libroEncontrado) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              descripcion: "Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarLibros"
            }
          });
        }
        if (libroEncontrado) {
          return res.view("Libro/editarLibro", {
            libroAEditar: libroEncontrado
          });
        } else {
          return res.view('vistas/Error', {
            error: {
              descripcion: "El libro con id: " + parametros.id + " no existe.",
              rawError: "No existe el libro",
              url: "/ListarLibros"
            }
          });
        }
      })
    } else {

      return res.view('vistas/Error', {
        error: {
          descripcion: "No ha envíado al parámetro ID",
          rawError: "Faltan Parámetros",
          url: "/ListarLibros"
        }
      });

    }
  }

};
