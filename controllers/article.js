
const articleDbModel = require('../models/article')
const articleModel = new articleDbModel();

class articleController {
    constructor() {
        const articles = []
    }
    
    async getAllArticles(req, res) {
        try {
                const articles = await articleModel.findAll()
                res.status(201).json({articles: articles})
    }       catch (error) {
                res.status(500).json({ error: error.message });
    }
    }
}

module.exports = articleController