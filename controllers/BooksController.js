const Book = require("../models/Books");
const Author = require("../models/Authors");
const Category = require("../models/Categories");
const Editorial = require("../models/Publishers");
const transporter = require("../services/EmailService");

exports.GetBooksList = (req, res, next) => {
    Book.findAll({
        include: [{ model: Category }, { model: Author }, { model: Editorial }],
        order: [['title', 'ASC']],
    }).then(result => {
        const books = result.map(result => result.dataValues);
        res.render("book/index", {
            title: "Mantenimiento de Libros",
            isBook: true,
            books: books,
        });
    }).catch(err => {
        console.error(err);
    });
};

exports.GetCreateBook = (req, res, next) => {
    Category.findAll().then(result => {
        const categories = result.map(result => result.dataValues);

        Author.findAll().then(result => {
            const authors = result.map(result => result.dataValues);

            Editorial.findAll().then(result => {
                const editorials = result.map(result => result.dataValues);

                res.render("book/save", {
                    title: "Crear Libro",
                    isBook: true,
                    editMode: false,
                    categories: categories,
                    authors: authors,
                    editorials: editorials,
                });

            }).catch(err => {
                console.error(err);
            });

        }).catch(err => {
            console.error(err);
        });

    }).catch(err => {
        console.error(err);
    });
};

exports.PostCreateBook = (req, res, next) => {
    const { title, published, categoryId, authorId, editorialId } = req.body;
    const image = req.file;

    if (!image) {
        return res.status(302).redirect('/book');
    }

    Book.create({
        title: title,
        published: published,
        imagePath: '/' + image.path,
        categoryId: categoryId,
        authorId: authorId,
        editorialId: editorialId,
    }).then(result => {
        const book = result.dataValues;

        res.status(302).redirect('/book');

        Author.findByPk(authorId).then(result => {
            const author = result.dataValues;

            return transporter.sendMail({
                from: "BookApp Notifications",
                to: author.email,
                subject: "Creacion de Libro!",
                html: `
                    <h1>Hola ${author.name}!</h1>
                    <p>El libro: <strong>${title}</strong> Se ha publicado correctamente.</p>
                `,
            }, err => {
                if (err) {
                    console.error(err);
                }
            });
        }).catch(err => {
            console.error(err);
        });
    }).catch(err => {
        console.error(err);
    });
};

exports.PostEditBook = (req, res, next) => {
    const { bookId, title, published, categoryId, authorId, editorialId, } = req.body;
    const image = req.file;

    Book.findByPk(bookId).then(result => {
        const book = result.dataValues;

        if (!book) {
            return res.status(302).redirect("/book");
        }

        const imagePath = image ? "/" + image.path : book.imagePath;

        Book.update({
            title: title,
            published: published,
            imagePath: imagePath,
            categoryId: categoryId,
            authorId: authorId,
            editorialId: editorialId,
        }, {
            where: {
                id: bookId,
            }
        }).then(result => {
            res.status(302).redirect('/book');
        }).catch(err => {
            console.error(err);
        });
    }).catch(err => {
        console.error(err);
    });
};

exports.GetEditBook = (req, res, next) => {
    const edit = req.query.edit;
    const bookId = req.params.bookId;

    if (!edit) {
        return res.status(302).redirect("/book");
    }

    Book.findByPk(bookId)
        .then(result => {
            const book = result.dataValues;

            if (!book) {
                return res.status(302).redirect("/book");
            }

            Category.findAll()
                .then(result => {
                    const categories = result.map(result => result.dataValues);

                    Author.findAll()
                        .then(result => {
                            const authors = result.map(result => result.dataValues);

                            Editorial.findAll()
                                .then(result => {
                                    const editorials = result.map(result => result.dataValues);

                                    res.render("book/save", {
                                        title: "Editar Libro",
                                        isBook: true,
                                        book: book,
                                        editMode: edit,
                                        categories: categories,
                                        authors: authors,
                                        editorials: editorials,
                                    });
                                })
                                .catch(err => {
                                    console.error(err);
                                });
                        })
                        .catch(err => {
                            console.error(err);
                        });
                })
                .catch(err => {
                    console.error(err);
                });

        })
        .catch(err => {
            console.error(err);
        });
}

exports.PostDeleteBook = (req, res, next) => {
    const { bookId, } = req.body;

    Book.destroy({ where: { id: bookId, } }).then(result => {
        res.status(302).redirect('/book');
    }).catch(err => {
        console.error(err);
    });
};