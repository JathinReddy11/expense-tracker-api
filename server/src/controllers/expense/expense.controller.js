const {
  isCategoryOwnedByUser,
  insertExpense,
  listExpenses,
  changeExpense,
  removeExpense,
} = require('../../repositories/expense/expense.repository');

const { getReportCsv } = require('../../service/reports.service');

async function createExpense(req, res, next) {
  try {
    const { category_id, amount, description, expense_date } = req.body;
    const { user_id } = req.user;

    const results = await isCategoryOwnedByUser(user_id, category_id);
    if (results.rowCount === 0) {
      throw new Error('RESOURCE_NOT_FOUND');
    }

    const insert_results = await insertExpense(
      user_id,
      category_id,
      amount,
      description,
      expense_date
    );
    return res.status(201).json({ success: true, data: insert_results.rows[0] });
  } catch (err) {
    next(err);
  }
}

async function getExpenses(req, res, next) {
  try {
    const { user_id } = req.user;

    const { page_number = 1, limit = 10, category_id, startDate, endDate, expense_id } = req.query;
    let { sortBy, order } = req.query;

    if (startDate && endDate) {
      if (startDate > endDate) {
        throw new Error('INVALID_INPUT');
      }
    }

    if (sortBy) {
      sortBy = sortBy.toLowerCase();
      if (sortBy != 'expense_date' && sortBy != 'amount') {
        sortBy = 'expense_date';
      }
    }

    if (order) {
      order = order.toUpperCase();
      if (order != 'ASC' && order != 'DESC') {
        order = 'DESC';
      }
    }

    const { expense_results, count } = await listExpenses(
      user_id,
      expense_id,
      category_id,
      startDate,
      endDate,
      sortBy,
      order,
      page_number,
      limit
    );

    const total_items = count;
    const total_pages = Math.ceil(total_items / limit);

    return res.status(200).json({
      success: true,
      data: {
        expenses: expense_results.rows,
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

async function updateExpense(req, res, next) {
  try {
    const { user_id } = req.user;
    const expense_id = parseInt(req.params.expense_id);
    if (!expense_id) throw new Error('INVALID_INPUT');
    const { category_id, amount, description, expense_date } = req.body;

    if (category_id) {
      const results = await isCategoryOwnedByUser(user_id, category_id);
      if (results.rowCount === 0) {
        throw new Error('RESOURCE_NOT_FOUND');
      }
    }

    const updatedResults = await changeExpense(
      expense_id,
      category_id,
      amount,
      description,
      user_id,
      expense_date
    );
    if (updatedResults.rowCount === 0) {
      throw new Error('RESOURCE_NOT_FOUND');
    }

    return res.status(200).json({ success: true, data: updatedResults.rows[0] });
  } catch (err) {
    next(err);
  }
}

async function deleteExpense(req, res, next) {
  try {
    const { user_id } = req.user;
    const expense_id = Number(req.params.expense_id);
    if (!expense_id) throw new Error('INVALID_INPUT');

    const results = await removeExpense(user_id, expense_id);
    if (results.rowCount === 0) {
      throw new Error('RESOURCE_NOT_FOUND');
    }
    return res.status(200).json({ success: true, data: 'Successfully deleted' });
  } catch (err) {
    next(err);
  }
}

async function exportExpenses(req, res, next) {
  try {
    const { user_id } = req.user;
    const { category_id, startDate, endDate } = req.query;
    let { sortBy, order } = req.query;

    if (startDate && endDate) {
      if (startDate > endDate) {
        throw new Error('INVALID_INPUT');
      }
    }

    if (sortBy) {
      sortBy = sortBy.toLowerCase();
      if (sortBy != 'expense_date' && sortBy != 'amount') {
        sortBy = 'expense_date';
      }
    }

    if (order) {
      order = order.toUpperCase();
      if (order != 'ASC' && order != 'DESC') {
        order = 'DESC';
      }
    }

    const csv_string = await getReportCsv(user_id, category_id, startDate, endDate, sortBy, order);

    res.setHeader('Content-type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=report.csv');

    return res.status(200).send(csv_string);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  exportExpenses,
};
