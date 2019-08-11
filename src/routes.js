const express = require('express');
const routes = express.Router();
const DevController = require('./controllers/DevController')
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')


routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store)
routes.post('/devs/:devId/dislikes', DislikeController.store)
routes.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

routes.get('/teste', (req, res) =>{
    res.send('sucess')
})

module.exports = routes;
