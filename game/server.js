import express from "express";
import http from "http";
import { Server } from "socket.io";
import mysql from "mysql2";
import { Game } from "./static/js/core/Game.js";

const app = express();
const server = http.createServer(app);
const sockets = new Server(server);

// Configuração do banco de dados
const db = mysql.createConnection({
    user: "root",
    password: "root",
    database: "users_game",
    host: "localhost", // Apenas o host, sem porta ou /mysql.
});

// Middleware para analisar requisições JSON
app.use(express.json());

app.use(express.static("static"))

const game = new Game()

game.subscribe(function serverSocketHandler(command) {
    console.log(`socket.io> Emmiting ${command.event} from playerId ${command.playerId}`)
    sockets.emit(command.event, command)
})

sockets.on("connection", (socket) => {
    const playerId = socket.id
    console.log(`socket.io> Player connected on Server with id ${playerId}`)

    game.addPlayer({ playerId: socket.id, playerName: ""})

    socket.emit("setup", game.state)

    socket.on("disconnect", () => {
        console.log(`socket.io> Player disconnected on Server with id ${playerId}`)
        game.removePlayer({ playerId: playerId })
    })

    socket.on("move-player", (command) => {
        command.playerId = playerId
        command.event = "move-player"

        game.movePlayer(command)
    })

    socket.on("update-gamemode", (command) => {
        command.playerId = playerId
        command.event = "update-gamemode"

        game.setGamemode(command)
    })

})

server.listen(3000, () => {
    console.log("> Server listening on port: 3000")
})
app.post('/login', function (req, res) {
    const loginData = req.body; // Obtenha os dados de login do corpo da solicitação POST

    // Execute uma consulta SQL para encontrar o usuário com base no nome de usuário
    db.query('SELECT * FROM users WHERE username = ?', [loginData.username], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            res.status(500).json({ success: false, message: 'Erro no servidor' });
            return;
        }

        // Verifique se um usuário com o nome de usuário fornecido foi encontrado
        if (results.length === 1) {
            const user = results[0];

            // Verifique se a senha fornecida corresponde à senha no banco de dados
            if (loginData.password === user.password) {
                // Login bem-sucedido, envie uma resposta de sucesso
                res.json({ success: true, message: 'Login bem-sucedido' });
                alert("Login bem-sucedido");
            } else {
                // Senha incorreta, envie uma resposta de erro
                res.status(401).json({ success: false, message: 'Senha incorreta' });
                alert("Senha incorreto");
            }
        } else {
            // Usuário não encontrado, envie uma resposta de erro
            res.status(401).json({ success: false, message: 'Usuário não encontrado' });
            alert("Usuario não encontrado");
        }
    });
});


app.post('/registrar', (req, res) => {
    const userData = req.body; // Obtenha os dados do corpo da solicitação POST.

    // Execute a inserção no banco de dados usando os dados do usuário
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [userData.username, userData.password], (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados no banco de dados:', err);
            res.status(500).json({ error: 'Erro ao registrar usuário' });
            return;
        }

        console.log('Dados inseridos com sucesso:', results);
        res.json({ success: 'Usuário registrado com sucesso' });
    });
});
