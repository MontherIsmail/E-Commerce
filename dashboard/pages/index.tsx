import DashboardLayout from "@/components/DashboardLayout";
import withAuth from "../hoc/withAuth";
import { useState, useEffect } from "react";
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

interface AnalyticsData {
  totalSales: number;
  totalOrders: number;
  totalRevenue: number;
  newCustomers: number;
  totalUsers: number;
  totalProducts: number;
  lowStockProducts: number;
  topProducts: Array<{
    name: string;
    sales: number;
    price: number;
  }>;
  salesOverTime: number[];
  ordersOverTime: number[];
  monthLabels: string[];
}

const AnalysisPage = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/v1/analytics', {
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch analytics data');
        }
      } catch (err) {
        console.error('Analytics fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Analysis</h1>
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading analytics data...</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Analysis</h1>
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">Error: {error}</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Analysis</h1>
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">No data available</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sales and Orders Analytics',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Analysis</h1>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-600">Total Sales</h2>
            <p className="text-3xl font-bold text-green-600">${data.totalSales.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
            <p className="text-3xl font-bold text-blue-600">{data.totalOrders.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-600">Total Revenue</h2>
            <p className="text-3xl font-bold text-purple-600">${data.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-600">New Customers</h2>
            <p className="text-3xl font-bold text-orange-600">{data.newCustomers.toLocaleString()}</p>
          </div>
        </div>

        {/* Additional KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
            <p className="text-2xl font-bold text-indigo-600">{data.totalUsers.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-600">Total Products</h2>
            <p className="text-2xl font-bold text-teal-600">{data.totalProducts.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-600">Low Stock Products</h2>
            <p className="text-2xl font-bold text-red-600">{data.lowStockProducts.toLocaleString()}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Over Time Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Sales Over Time</h2>
            <Line
              data={{
                labels: data.monthLabels,
                datasets: [
                  {
                    label: "Sales ($)",
                    data: data.salesOverTime,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                    fill: true,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>

          {/* Orders Over Time Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Orders Over Time</h2>
            <Bar
              data={{
                labels: data.monthLabels,
                datasets: [
                  {
                    label: "Orders",
                    data: data.ordersOverTime,
                    backgroundColor: "rgba(153, 102, 255, 0.6)",
                    borderColor: "rgba(153, 102, 255, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>

        {/* Top Products List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Top Products by Sales</h2>
          {data.topProducts.length > 0 ? (
            <div className="space-y-3">
              {data.topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">${product.price.toFixed(2)} each</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{product.sales} sold</p>
                    <p className="text-sm text-gray-600">${(product.sales * product.price).toFixed(2)} revenue</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No sales data available</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(AnalysisPage);
