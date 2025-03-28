const Editorial = require('../models/Publishers');
const Book = require('../models/Books');

exports.GetPublishersList = (req, res, next) => {
    Editorial.findAll({
        include: [{ model: Book }],
        order: [['name', 'ASC']],
    }).then(result => {
        const editorials = result.map(result => result.dataValues);

        res.render("editorial/index", {
            title: "Mantenimiento de Editoriales",
            isEditorial: true,
            editorials: editorials,
        });
    }).catch(err => {
        console.error(err);
    });
}

exports.GetCreateEditorial = (req, res, next) => {
    res.render("editorial/save", {
        title: "Crear Editorial",
        isEditorial: true,
        editMode: false,
    });
}

exports.PostCreateEditorial = (req, res, next) => {
    const { name, phone, country } = req.body;

    Editorial.create({
        name: name,
        phone: phone,
        country: country,
    }).then(result => {
        res.status(302).redirect('/editorial');
    }).catch(err => {
        console.error(err);
    });
};

exports.GetEditEditorial = (req, res, next) => {
    const edit = req.query.edit;
    const editorialId = req.params.editorialId;

    if (!edit) {
        return res.status(302).redirect("/editorial");
    }

    Editorial.findByPk(editorialId).then(result => {
        const editorial = result.dataValues;

        if (!editorial) {
            return res.status(302).redirect("/editorial");
        }

        res.render("editorial/save", {
            title: "Editar Editorial",
            isEditorial: true,
            editorial: editorial,
            editMode: edit,
        });
    }).catch(err => {
        console.error(err);
    });
}

exports.PostEditEditorial = (req, res, next) => {
    const { id, name, phone, country } = req.body;

    Editorial.update({
        name: name,
        phone: phone,
        country: country,
    }, {
        where: {
            id: id,
        }
    }).then(result => {
        res.status(302).redirect('/editorial');
    }).catch(err => {
        console.error(err);
    });
}

exports.PostDeleteEditorial = (req, res, next) => {
    const { editorialId, } = req.body;

    Editorial.destroy({ where: { id: editorialId, } }).then(result => {
        res.status(302).redirect('/editorial');
    }).catch(err => {
        console.error(err);
    });
}
