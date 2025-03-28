const Author = require('../models/Authors');
const Book = require('../models/Books');

exports.GetAuthorsList = (req, res, next) => {
    Author.findAll({
        include: [{ model: Book }],
        order: [['name', 'ASC']],
    }).then(result => {
        const authors = result.map(result => result.dataValues);
        res.render("author/index", {
            title: "Mantenimiento de Autores",
            isAuthor: true,
            authors: authors,
        });
    }).catch(err => {
        console.error(err);
    });
}

exports.GetCreateAuthor = (req, res, next) => {
    res.render("author/save", {
        title: "Crear Autor",
        isAuthor: true,
        editMode: false,
    });
}

exports.PostCreateAuthor = (req, res, next) => {
    const { name, email } = req.body;
    Author.create({
        name: name,
        email: email,
    }).then(result => {
        res.status(302).redirect('/author');
    }).catch(err => {
        console.error(err);
    });
};

exports.GetEditAuthor = (req, res, next) => {
    const edit = req.query.edit;
    const authorId = req.params.authorId;
    if (!edit) {
        return res.status(302).redirect("/author");
    }
    Author.findByPk(authorId).then(result => {
        const author = result.dataValues;
        if (!author) {
            return res.status(302).redirect("/author");
        }
        res.render("author/save", {
            title: "Editar Autor",
            isAuthor: true,
            author: author,
            editMode: edit,
        });
    }).catch(err => {
        console.error(err);
    });
}

exports.PostEditAuthor = (req, res, next) => {
    const { id, name, email } = req.body;
    Author.update({
        name: name,
        email: email,
    }, {
        where: {
            id: id,
        }
    }).then(result => {
        res.status(302).redirect('/author');
    }).catch(err => {
        console.error(err);
    });
}

exports.PostDeleteAuthor = (req, res, next) => {
    const { authorId, } = req.body;
    Author.destroy({ where: { id: authorId, } }).then(result => {
        res.status(302).redirect('/author');
    }).catch(err => {
        console.error(err);
    });
}