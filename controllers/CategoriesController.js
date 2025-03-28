const Category = require('../models/Categories');
const Book = require('../models/Books');

exports.GetCategoriesList = (req, res, next) => {
    Category.findAll({
        include: [{ model: Book }],
        order: [['name', 'ASC']],
    }).then(result => {
        const categories = result.map(result => result.dataValues);
        res.render("category/index", {
            title: "Mantenimiento de Categorias",
            isCategory: true,
            categories: categories,
        });
    }).catch(err => {
        console.error(err);
    });
};

exports.GetCreateCategory = (req, res, next) => {
    res.render("category/save", {
        title: "Crear Categoria",
        isCategory: true,
        editMode: false,
    });
};

exports.PostCreateCategory = (req, res, next) => {
    const { name, description } = req.body;

    Category.create({
        name: name,
        description: description,
    }).then(result => {
        res.status(302).redirect('/category');
    }).catch(err => {
        console.error(err);
    });
};

exports.PostEditCategory = (req, res, next) => {
    const { id, name, description } = req.body;

    Category.update({
        name: name,
        description: description,
    }, {
        where: {
            id: id,
        }
    }).then(result => {
        res.status(302).redirect('/category');
    }).catch(err => {
        console.error(err);
    });
};

exports.GetEditCategory = (req, res, next) => {
    const edit = req.query.edit;
    const categoryId = req.params.categoryId;

    if (!edit) {
        return res.status(302).redirect("/category");
    }

    Category.findByPk(categoryId).then(result => {
        const category = result.dataValues;

        if (!category) {
            return res.status(302).redirect("/category");
        }

        res.render("category/save", {
            title: "Editar Categoria",
            isCategory: true,
            category: category,
            editMode: edit,
        });
    }).catch(err => {
        console.error(err);
    });
}

exports.PostDeleteCategory = (req, res, next) => {
    const { categoryId, } = req.body;

    Category.destroy({ where: { id: categoryId, } })
    .then(result => {
        res.status(302).redirect('/category');
    })
    .catch(err => {
        console.error(err);
    });
};
