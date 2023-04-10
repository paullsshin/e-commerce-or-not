const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryList = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categoryList);
  } catch (err) {
    res.status(500).json(err)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryList = await Category.findByPk(req.params.id, {
      include: [{ model: Product, }]
    });

    if(!categoryList) {
      res.status(404).json({message: "There are no products with this ID!"});
      return;
    }
    res.status(200).json(categoryList);
  } catch (err) {
    res.status(400).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const categoryList = await Category.create(req.body);
    res.status(200).json(categoryList);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
try {
  const updateCategory = await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json(updateCategory)
} catch(err) {
  res.status(500).json(err)
}
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryList = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!categoryList) {
      res.status(404).json({message: "There are no products with this ID!"});
      return;
    }
    res.status(200).json(categoryList);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete a category by its `id` value
});

module.exports = router;