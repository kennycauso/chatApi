const userControllers = require('./users.controllers');

const getAllUsers = (req, res) => {
    userControllers.getAllUsers()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json({ message: err.message }))
};

const getUserById = (req, res) => {
    const id = req.params.id;
    userControllers.getUserById(id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(404).json({ message: err.message }))
};

const registerUser = (req, res) => {
    const { firstName, lastName, email, password, phone, birthday, gender, country } = req.body;
    if (firstName && lastName && email && password && phone && birthday) {
        userControllers.createUser({ firstName, lastName, email, password, phone, birthday, gender, country })
            .then(response => {
                // if (firstName, lastName, email, password, phone, birthday, gender, country) {
                res.status(201).json(response)
                // } else {
                //     res.status(400).json({ message: 'Invalid Data' })
                // }
            })
            .catch(err => {
                res.status(400).json({ message: err.message })
            })
    } else {
        //Error cuando no mandan los datos necesarios
        res.status(400).json({
            message: 'All fields must be completed', fields: {
                firstName: "string",
                lastName: "string",
                email: "example@mail.com",
                password: "string",
                phone: "+5188797989",
                birthday: "YYYY/MM/DD"
            }
        })
    }
};


const patchUser = (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, phone, gender, country } = req.body;
    userControllers.updateUser(id, { firstName, lastName, phone, gender, country })
        .then(response => {
            if (response[0]) {
                res.status(200).json({ message: `User with ID: ${id}, edited succesfully!` })
            } else {
                res.status(400).json({ message: 'Invalid ID' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
};

const deleteUser = (req, res) => {
    const id = req.params.id;
    userControllers
        .deleteUser(id)
        .then((response) => {
            if (response) {
                res.status(204).json();
            } else {
                res.status(404).json({ message: "Invalid ID" });
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

//My user services:
const getMyUser = (req, res) => {
    const id = req.user.id //Contiene la información del token desencriptado
    userControllers.getUserById(id)
        .then(response => {
            if (response) {
                res.status(200).json(response);
            }
        })
        .catch(err => res.status(400).json({ message: err.message }))
};

// TODO crear rutas protegidas /me, con los verbos para update y delete

const patchMyUser = (req, res) => {
    const id = req.user.id;
    const { firstName, lastName, phone, birthday, gender, country } = req.body;

    userControllers.updateUser(id, { firstName, lastName, phone, birthday, gender, country })
        .then(() => {
            res.status(200).json({ message: 'Your user was edited succesfully!' })
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
};

// 2 Tipos de DELETE:
// - Por administrador
// - Por mi mismo

const deleteMyUser = (req, res) => {
    const id = req.user.id;
    userControllers.updateUser(id, { status: 'inactive' })
        .then(() => {
            res.status(200).json({ message: 'Your user was deleted succesfully!' })
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
};

module.exports = {
    getAllUsers,
    getUserById,
    patchUser,
    registerUser,
    deleteUser,
    getMyUser,
    patchMyUser,
    deleteMyUser
}
