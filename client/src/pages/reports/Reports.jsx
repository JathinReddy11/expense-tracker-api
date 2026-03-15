import { useState, useEffect } from "react";
import {
  getMonthlyTotal,
  getYearlyTotal,
  getCategorySummary,
} from "../../services/report.service";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const current_month = new Date().getMonth() + 1;
const current_year = new Date().getFullYear();
let start_year = 1960;

export default function Reports() {
  const [month, setMonth] = useState(current_month);
  const [year, setYear] = useState(current_year);
  const [monthlySummary, setMonthlySummary] = useState(null);
  const [monthlyError, setMonthlyError] = useState(null);
  const [loadingMonthly, setLoadingMonthly] = useState(false);

  const [yearlySummary, setYearlySummary] = useState(null);
  const [yearlyError, setYearlyError] = useState(null);
  const [loadingYearly, setLoadingYearly] = useState(false);

  const [categorySummary, setCategorySummary] = useState(null);
  const [categoryError, setCategoryError] = useState(null);
  const [loadingCategory, setLoadingCategory] = useState(false);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const years = [];
  for (let i = start_year; i <= current_year; i++) {
    years.push(i);
  }

  const fetchMonthly = async () => {
    setMonthlyError(null);
    setLoadingMonthly(true);
    try {
      const monthlyData = await getMonthlyTotal(year, month);
      setMonthlySummary(monthlyData.data);
    } catch (err) {
      setMonthlyError("Something went wrong while fetching monthly expense");
    } finally {
      setLoadingMonthly(false);
    }
  };

  const fetchYearly = async () => {
    setYearlyError(null);
    setLoadingYearly(true);
    try {
      const yearlyData = await getYearlyTotal(year);
      setYearlySummary(yearlyData.data);
    } catch (err) {
      setYearlyError("Something went wrong while fetching yearly expense");
    } finally {
      setLoadingYearly(false);
    }
  };

  const fetchCategory = async () => {
    setLoadingCategory(true);
    setCategoryError(null);
    try {
      const categoryData = await getCategorySummary(
        `${year}-01-01`,
        `${year}-12-31`,
      );
      setCategorySummary(categoryData.data);
    } catch (err) {
      console.log(err);
      setCategoryError("Something went wrong while fetching Category Summary");
    } finally {
      setLoadingCategory(false);
    }
  };

  useEffect(() => {
    fetchMonthly();
    fetchYearly();
    fetchCategory();
  }, []);

  const handleReports = (e) => {
    e.preventDefault();
    fetchMonthly();
    fetchYearly();
    fetchCategory();
  };

  let yearlyReport = [];

  const total_spent = yearlySummary
    ? yearlySummary.reduce((sum, item) => sum + Number(item.total), 0)
    : 0;

  if (yearlySummary) {
    for (let i = 0; i < months.length; i++) {
      let flag = false;

      for (let j = 0; j < yearlySummary.length; j++) {
        if (i + 1 === Number(yearlySummary[j].month)) {
          yearlyReport.push(
            <li key={i}>
              {months[i]}-${yearlySummary[j].total}
            </li>,
          );

          flag = true;
          break;
        }
      }

      if (!flag) {
        yearlyReport.push(<li key={i}>{months[i]} - $0.00</li>);
      }
    }
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
  const chartData = categorySummary
    ? categorySummary.categories.map((category) => {
        return {
          name: category.category_name,
          value: Number(category.total_amount),
        };
      })
    : [];

  return (
    <div>
      <form>
        <label htmlFor="month">Month</label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map((month, index) => {
            return (
              <option key={index + 1} value={index + 1}>
                {month}
              </option>
            );
          })}
        </select>

        <label htmlFor="year">year</label>
        <select
          name="year"
          id="year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {years.map((year, index) => {
            return (
              <option key={index + 1} value={year}>
                {year}
              </option>
            );
          })}
        </select>

        <button type="submit" onClick={handleReports}>
          Get reports
        </button>
      </form>

      <h1>Monthly Reports</h1>
      {loadingMonthly && <p>Loading Monthly report...</p>}
      {monthlyError && <p>{monthlyError}</p>}

      {!loadingMonthly &&
        !monthlyError &&
        (monthlySummary ? (
          <>
            <p>No of expenses: {monthlySummary.total_expenses}</p>
            <p>Total spent: ${monthlySummary.total}</p>
          </>
        ) : null)}

      <h1>Yearly Report</h1>
      {loadingYearly && <p>Loading Yearly report...</p>}
      {yearlyError && <p>{yearlyError}</p>}

      {!loadingYearly &&
        !yearlyError &&
        (yearlySummary ? (
          <>
            <p>Yearly Summary: {year}</p>
            <p>Total spent: ${total_spent.toFixed(2)}</p>

            <ul>{yearlyReport}</ul>
          </>
        ) : null)}

      <h1>Yearly Category Report</h1>
      {loadingCategory && <p>Loading Category report...</p>}
      {categoryError && <p>{categoryError}</p>}

      {!loadingCategory &&
        !categoryError &&
        (categorySummary ? (
          categorySummary.categories.length === 0 ? (
            "No category spending data for this year."
          ) : (
            <>
              <p>Category Summary: {year}</p>
              <p>Total spent: ${categorySummary.totalSpent}</p>

              <ul>
                {categorySummary.categories.map((category) => {
                  return (
                    <li key={category.category_id}>
                      {category.category_name}- ${category.total_amount} (%
                      {category.percentage})
                    </li>
                  );
                })}
              </ul>

              <h2>Category Spending Chart</h2>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </>
          )
        ) : null)}
    </div>
  );
}
