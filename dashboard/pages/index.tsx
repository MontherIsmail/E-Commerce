import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import "tailwindcss/tailwind.css";

// Register the necessary Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalysisPage = () => {
  // Fake data for KPIs and charts
  const [data] = useState({
    totalSales: 5000,
    totalOrders: 120,
    totalRevenue: 15000,
    newCustomers: 30,
    topProducts: [
      { name: "Product A", sales: 200 },
      { name: "Product B", sales: 150 },
      { name: "Product C", sales: 120 },
    ],
    salesOverTime: [300, 400, 250, 500, 600],
    ordersOverTime: [10, 15, 20, 18, 25],
  });

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          Analysis
        </h1>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Sales</h2>
            <p className="text-3xl">${data.totalSales}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-3xl">{data.totalOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Revenue</h2>
            <p className="text-3xl">${data.totalRevenue}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">New Customers</h2>
            <p className="text-3xl">{data.newCustomers}</p>
          </div>
        </div>

        {/* Sales Over Time Chart */}
        <div className="mt-8">
          <Line
            data={{
              labels: ["January", "February", "March", "April", "May"],
              datasets: [
                {
                  label: "Sales Over Time",
                  data: data.salesOverTime,
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                  borderColor: "rgba(75, 192, 192, 1)",
                },
              ],
            }}
          />
        </div>

        {/* Orders Over Time Chart */}
        <div className="mt-8">
          <Bar
            data={{
              labels: ["January", "February", "March", "April", "May"],
              datasets: [
                {
                  label: "Orders Over Time",
                  data: data.ordersOverTime,
                  backgroundColor: "rgba(153, 102, 255, 0.6)",
                  borderColor: "rgba(153, 102, 255, 1)",
                },
              ],
            }}
          />
        </div>

        {/* Top Products List */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Top Products</h2>
          <ul>
            {data.topProducts.map((product, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded-lg shadow-md mb-2"
              >
                <p>
                  {product.name} - {product.sales} sales
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalysisPage;
