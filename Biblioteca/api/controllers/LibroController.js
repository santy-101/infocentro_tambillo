/**
 * LibroController
 *
 * @description :: Server-side logic for managing Libroes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearLibro: function (req, res) {

    if (req.method == "POST") {

      var parametros = req.allParams();
      if (parametros.nombre && parametros.autor && parametros.cantidad) {

        var libroCrear = {
          nombre: parametros.nombre,
          autor: parametros.autor,
          cantidad: parametros.cantidad
        };
        console.log(libroCrear);
        Libro.create(libroCrear).exec(function (err, libroCreado) {

          if (err) {
            return res.view('vistas/Error', {
              error: {
                descripcion: "Fallo al registrar el libro",
                rawError: err,
                url: "/CrearLibro"
              }

            });
          }

          Libro.find()
            .exec(function (errorIndefinido, librosEncontrados) {

              if (errorIndefinido) {
                res.view('vistas/Error', {
                  error: {
                    descripcion: "Hubo un problema cargando los libros",
                    rawError: errorIndefinido,
                    url: "/ListarLibros"
                  }
                });
              }

              return res.view('Libro/listarLibros', {
                libros: librosEncontrados
              });
            })

        })


      } else {

        return res.view('vistas/Error', {
          error: {
            descripcion: "Envíe todos los campos",
            rawError: "Falló el envío de parámetros.",
            url: "/CrearLibro"
          }

        });

      }


    } else {

      return res.view('vistas/Error', {
        error: {
          descripcion: "Error en el uso del Método HTTP",
          rawError: "HTTP Inválido",
          url: "/CrearLibro"
        }
      });

    }

  },
  editarLibro: function (req, res) {
    var parametros = req.allParams();

    if (parametros.idLibro && (parametros.nombre || parametros.autor || parametros.cantidad)) {

      var libroAEditar = {
        nombre: parametros.nombre,
        autor: parametros.autor,
        cantidad: parametros.cantidad
      };

      Libro.update({
        id: parametros.idLibro
      }, libroAEditar).exec(function (errorInesperado) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              descripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarLibros"
            }
          });
        }
        Libro.find()
          .exec(function (errorIndefinido, librosEncontrados) {

            if (errorIndefinido) {
              res.view('vistas/Error', {
                error: {
                  descripcion: "Hubo un problema cargando los libros",
                  rawError: errorIndefinido,
                  url: "/EditarLibro"
                }
              });
            }

            res.view('Libro/listarLibros', {
              libros: librosEncontrados
            });
          })
      })

    } else {
      return res.view('vistas/Error', {
        error: {
          descripcion: "Necesitamos que envíe los parámetros ",
          rawError: "No envía parámetros",
          url: "/ListarLibros"
        }
      });
    }

  },
  borrarLibro: function (req, res) {
    var parametros = req.allParams();

    if (parametros.id) {

      Libro.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, libroEliminado) {
        if (errorInesperado) {
          return res.view('vistas/Error', {
            error: {
              descripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarLibros"
            }
          });
        }
        Libro.find()
          .exec(function (errorIndefinido, librosEncontrados) {

            if (errorIndefinido) {
              res.view('vistas/Error', {
                error: {
                  descripcion: "Hubo un problema cargando los libros",
                  rawError: errorIndefinido,
                  url: "/ListarLibros"
                }
              });
            }
            res.view('Libro/listarLibros', {
              libros: librosEncontrados
            });
          })
      })

    } else {
      return res.view('vistas/Error', {
        error: {
          desripcion: "Necesitamos el ID para borrar el libro",
          rawError: "No envía ID",
          url: "/ListarLibros"
        }
      });
    }
  },
  buscarLibros: function (req, res) {
    var parametros = req.allParams();
    Libro.find({
      or : [
        { nombre: parametros.nombre },
        { autor: parametros.autor }
      ]
    }).exec(function (errorIndefinido, librosEncontrados) {

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
};

