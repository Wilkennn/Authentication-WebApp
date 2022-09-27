const bcryty = require('bcryptjs')
const mysql = require('../connection').database
const nodeMailer = require('nodemailer')

exports.register = (req, res) => {

    mysql.connect((err) => {
        if (err) { return res.status(500).send({ error: err.message }) }

        const { name, login, telefone, senha, passwordConfirm } = req.body

        mysql.query('SELECT EMAIL FROM USER WHERE EMAIL = ?', [login], async (err, results) => {

            if (results.length == 0 && !err) {

                if (senha !== passwordConfirm) { return res.render('register', { message: 'Senhas não conferem.' }) }

                bcryty.hash(senha, 10, (err, hash) => {

                    if (err) { return res.status(500).send({ error: err.message }) }

                    const insert = 'INSERT INTO USER ( EMAIL, SENHA, NOME, TELEFONE) VALUES(?,?,?,?)'

                    mysql.query(insert,
                        [login, hash, name, telefone],
                        (err, results) => {
                            if (err) { return res.status(500).send({ error: err }) }
                            return res.status(201).render('register', { message: "Usuário cridado com sucesso!" })
                        }
                    )
                    mysql.end()
                })
            } else {
                return res.render('register', { message: 'Usuário já cadastrado.' })
            }
        })
    })
}

exports.login = (req, res) => {

    const { email, password } = req.body

    mysql.connect((err) => {

        if (err) { return res.status(500).send({ error: err }) }

        const query = `SELECT * FROM USER WHERE EMAIL = ?`;

        mysql.query(query, [email, password], (err, results) => {

            if (err) { return res.status(500).send({ error: err }) }

            if (results.length < 1) {
                return res.status(401).send({ message: "Aconteceu um erro. Tente Novamente!" })
            }

            bcryty.compare(senha, results[0].password, (err, results) => {
                if (err) { return res.status(401).send({ message: "Aconteceu um erro. Tente Novamente!" }) }
                if (results) { return res.status(200).render('inicio') }
                return res.status(401).send({ message: "Aconteceu um erro. Tente Novamente!" })
            })
        })
    })
}

exports.recoverPassword = () => {

}