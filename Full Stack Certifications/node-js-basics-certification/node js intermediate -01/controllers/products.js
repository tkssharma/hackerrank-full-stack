
const ProductModel = require('../models/products');
class ProductController {
  async createProduct(req, res) {
    try {
      const { body } = req;
      const data = await ProductModel.findAll({});
      body.id = data.length + 1;
      body.isPublished = false;
      const response = await ProductModel.create(body);
      res.status(201).json(response);
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async getAllProducts(req, res) {
    let data = [];
    data = await ProductModel.findAll({});
    res.status(200).json(data);
  }
  async getProductById(req, res) {
    const { id } = req.params;
    const data = await ProductModel.findOne({ id });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send("ID not found");
    }
  }
  updateProductById(req, res) {
    res.status(405).json({ message: "Not allowed" });
  }
  async patchProductById(req, res) {
    const { id } = req.params;
    const { body } = req;
    const data = await ProductModel.findOne({where: {id}});
    console.log(data);
    if(!data) {
      res.status(404).send();
      return;
    }
    const { price, mrp,stock } = data;
    console.log(price, mrp);
    if(mrp < price && stock  === 0){
      res.status(422).send(['MRP should be less than equal to the Price', 'Stock count is 0'])
    }
    else if(mrp < price) {
      res.status(422).send([`MRP should be less than equal to the Price`]);
    }
    else if(stock  === 0) {
      res.status(422).send([`Stock count is 0`]);
    } else {
    await ProductModel.update({isPublished: true}, {where: {id}})
    res.status(204).json();
    }
  }
}

module.exports = new ProductController();
