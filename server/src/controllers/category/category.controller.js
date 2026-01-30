const {
  addCategory,
  listCategories,
  renameCategory,
  categoryDelete,
} = require("../../repositories/category/category.repository");

async function createCategory(req, res, next) {
  try {
    const { name } = req.body;
    const { user_id } = req.user;

    await addCategory(user_id, name);
    return res
      .status(201)
      .json({ success: true, data: "successfully created" });
  } catch (err) {
    next(err);
  }
}

async function getCategories(req, res, next) {
  try {
    const { user_id } = req.user;
    let { page_number = 1, limit = 10 } = req.query;

    const { results, total_count } = await listCategories(
      user_id,
      page_number,
      limit,
    );

    const total_items = total_count;
    const total_pages = Math.ceil(total_items / limit);

    return res.status(200).json({
      success: true,
      data: {
        categories: results.rows,
        total_items,
        current_page: total_pages === 0 ? 0 : page_number,
        limit,
        total_pages,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    const category_id = req.params.category_id;
    const { name } = req.body;
    const { user_id } = req.user;

    const result = await renameCategory(user_id, category_id, name);
    if (result.rowCount === 0) {
      throw new Error("RESOURCE_NOT_FOUND");
    }

    return res
      .status(200)
      .json({ success: true, data: "Successfully updated" });
  } catch (err) {
    return next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const category_id = req.params.category_id;
    const { user_id } = req.user;

    const results = await categoryDelete(user_id, category_id);
    if (results.rowCount === 0) {
      throw new Error("RESOURCE_NOT_FOUND");
    }
    return res
      .status(200)
      .json({ success: true, data: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
}
module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
