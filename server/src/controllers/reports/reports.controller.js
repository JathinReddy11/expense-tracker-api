const {
  getMonthlyTotalByUser,
  getYearlyTotalByUser,
  getCategoryWiseSummaryByUser,
} = require('../../repositories/reports/reports.repository');

async function getMonthlyExpenseTotal(req, res, next) {
  try {
    const { user_id } = req.user;
    const { year, month } = req.query;

    const start_date = new Date(year, month - 1, 1);
    const end_date = new Date(year, month, 1);

    const total = await getMonthlyTotalByUser(user_id, start_date, end_date);
    return res.status(200).json({ success: true, data: total });
  } catch (err) {
    next(err);
  }
}

async function getYearlyExpenseTotal(req, res, next) {
  try {
    const { user_id } = req.user;
    const { year } = req.query;

    const start_date = new Date(year, 0, 1);
    const end_date = new Date(year, 11, 31);

    const total = await getYearlyTotalByUser(user_id, start_date, end_date);
    return res.status(200).json({ success: true, data: total.rows });
  } catch (err) {
    next(err);
  }
}

async function getCategoryWiseSummary(req, res, next) {
  try {
    const { user_id } = req.user;
    const { start_date, end_date } = req.query;

    if (start_date && end_date) {
      if (start_date > end_date) {
        throw new Error('INVALID_INPUT');
      }
    }

    const { total, category_results } = await getCategoryWiseSummaryByUser(
      user_id,
      start_date,
      end_date
    );

    return res.status(200).json({
      success: true,
      data: { totalSpent: total, categories: category_results.rows },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getMonthlyExpenseTotal,
  getYearlyExpenseTotal,
  getCategoryWiseSummary,
};
