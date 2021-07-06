const mongoose = require("mongoose");
require("../users/users.model");
require("../categories/categories.model");

const ProductsSchema = new mongoose.Schema({
  name: { type: mongoose.Schema.Types.String },
  description: { type: mongoose.Schema.Types.String }, //det llargada
  startPrice: { type: mongoose.Schema.Types.Number },
  images: [{ type: mongoose.Schema.Types.String }],
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  state: { type: mongoose.Schema.Types.ObjectId, ref: "bids" },
  productState: { type: mongoose.Schema.Types.String },
  timestramp: { type: Date, default: Date.now },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "bids" }], //MIRAR
  endCost: { type: mongoose.Schema.Types.ObjectId, ref: "bids" }, //MIRAR COM. VE DE L'ALBERT QUAN ACABA LA PUJA
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  usersFavs: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

const ProductsModel = mongoose.model("products", ProductsSchema);

const getAll = async () => {
  const products = await ProductsModel.find();
  return products;
};

const create = async (product) => {
  const productCreated = await ProductsModel.create(product);
  return productCreated;
};

const getById = async (id) => {
  const productById = await ProductsModel.findById(id).populate(
    "sellerId",
    "name"
  ); //TODO: es pot posar un array per pillar tot el que volem
  return productById;
};

const searchWord = async (query) => {
  const products = await ProductsModel.findOne(query);
  return products;
};

const search = async (query) => {
  const products = await ProductsModel.find(query);
  return products;
};

const updateById = async (id, body) => {
  const updateProductById = await ProductsModel.findByIdAndUpdate(id, body); //MIRARRRRR

  return updateProductById;
};

module.exports = {
  getAll,
  create,
  getById,
  searchWord,
  updateById,
  search,
};
