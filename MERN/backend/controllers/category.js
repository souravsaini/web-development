const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec( (err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "No CATEGORY was found in DB"
      });
    }
    req.category = category;
    next();
  })
}

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save( (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save Category in DB"
      });
    }
    res.json(category);
  })
}

exports.getCategory = (req, res) => {
  return res.json(req.category);
}

exports.getAllCategory = (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) {
      res.status(400).json({
        error: "No Categories Found"
      })
    }
    res.json(categories);
  });
}

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save( (err, updatedCategory) => {
    if (err) {
      res.status(400).json({
        error: "failed to update category"
      })
    }
    res.json(updatedCategory);
  });
}

exports.deleteCategory = (req, res) => {
  const category = req.category;
  category.remove( (err, category) => {
    if (err) {
      res.status(400).json({
        error: "Unable to delete category"
      });
    }
    res.json({
      message: "successfully deleted"
    })
  })
}
