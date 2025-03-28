const Book = require("../models/Books");
const Author = require("../models/Authors");
const Category = require("../models/Categories");
const Editorial = require("../models/Publishers");
const { where } = require('sequelize');

exports.GetBooksList = (req, res, next) => {
    Category.findAll().then(result => {
        const categories = result.map(result => result.dataValues);
        Book.findAll({
            include: [{ model: Category }, { model: Author }, { model: Editorial }],
            order: [['title', 'ASC']],
        }).then(result => {
            const books = result.map(result => result.dataValues);
            return res.render("home/index", {
                title: "Home",
                isHome: true,
                books: books,
                categories: categories,
            });
        }).catch(err => {
            console.error(err);
        });
    }).catch(err => {
        console.error(err);
    });
}

exports.GetBookDetails = (req, res, next) => {
    const bookId = req.params.bookId;

    Book.findOne({
        where: {
            id: bookId
        },
        include: [{ model: Category }, { model: Author }, { model: Editorial }],
    })
    .then(result => {

        if (!result) {
            // Si no se encontró, rediriges o manejas la respuesta
            return res.redirect("/");
          }

        const book = result.dataValues;

        if (!book) {
            return res.status(302).redirect("/");
        }

        res.render("home/detail", {
            title: "Detail",
            isHome: true,
            book: book,
        });

    })
    .catch(err => {
        console.error(err);
    });
}

exports.PostFilterHome = (req, res, next) => {
    const { categoriesId, bookTitle } = req.body;

    Category.findAll().then(result => {
        const categories = result.map(result => result.dataValues);

        if (categoriesId) {
            Book.findAll({
                include: [{ model: Category }, { model: Author }, { model: Editorial }],
                where: {
                    categoryId: categoriesId
                },
                order: [['title', 'ASC']],
            }).then(result => {
                const books = result.map(result => result.dataValues);

                return res.render("home/index", {
                    title: "Home",
                    isHome: true,
                    books: books,
                    categories: categories,
                });
            }).catch(err => {
                console.error(err);
            });
        } else {
            Book.findAll({
                include: [{ model: Category }, { model: Author }, { model: Editorial }],
                order: [['title', 'ASC']],
            }).then(result => {
                let books = result.map(result => result.dataValues);

                if (bookTitle) {
                    books = books.filter(book => book.title.toLowerCase().includes(bookTitle.toLowerCase()));
                }

                return res.render("home/index", {
                    title: "Home",
                    isHome: true,
                    books: books,
                    categories: categories,
                });
            }).catch(err => {
                console.error(err);
            });
        }
    }).catch(err => {
        console.error(err);
    });
}