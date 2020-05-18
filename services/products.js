const productsMocks = require('../utils/mocks/products');
const mongoLib = require('../lib/mongo');

class ProductsService {
    constructor() {
        this.collection = 'products';
        this.mongoDB = new mongoLib()
    }
    async getProducts({ tags }) {
        const query = tags && { tags: { $in: tags } };
        const products = await this.mongoDB.getAll(this.collection, query);

        return products || [];
    }
 
    createProduct({ product }) {
        return Promise.resolve(productsMocks[0]);
    }

    updateProduct({ productId, product }) {
        return Promise.resolve(productsMocks[0]);
    }

    deleteProduct({ productId }) {
        return Promise.resolve(productsMocks[0]);
    }
}

module.exports = ProductsService;