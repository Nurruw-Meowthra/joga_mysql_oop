const authorDbModel = require('../models/author')
const articleDbModel = require('../models/article')

const authorModel = new authorDbModel();
const articleModel = new articleDbModel();

class authorController {
    constructor() {}
    
    async getAuthorById(req, res) {
        const author = await authorModel.findById(req.params.id)
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        const articles = await articleModel.findMany('author_id', author.id)
        author['articles'] = articles
        res.status(201).json({author: author})
    }
} 

module.exports = authorController