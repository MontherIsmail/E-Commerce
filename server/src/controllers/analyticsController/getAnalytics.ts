import { Request, Response } from "express";
import prisma from "../../middleware/prisma";

const getAnalytics = async (req: Request, res: Response) => {
  try {
    // Get total sales (sum of all order amounts)
    const totalSales = await prisma.order.aggregate({
      _sum: {
        amount: true,
      },
    });

    // Get total orders count
    const totalOrders = await prisma.order.count();

    // Get total revenue (same as total sales for this implementation)
    const totalRevenue = totalSales._sum.amount || 0;

    // Get new customers (users created in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newCustomers = await prisma.users.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    });

    // Get top products by sales quantity
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      _count: {
        productId: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5,
    });

    // Get product details for top products
    const topProductsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.products.findUnique({
          where: { id: item.productId },
          select: {
            productName: true,
            productPrice: true,
          },
        });
        return {
          name: product?.productName || 'Unknown Product',
          sales: item._sum.quantity || 0,
          price: product?.productPrice || 0,
        };
      })
    );

    // Get sales over time (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const salesOverTime = await prisma.order.groupBy({
      by: ['createdAt'],
      _sum: {
        amount: true,
      },
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Get orders over time (last 6 months)
    const ordersOverTime = await prisma.order.groupBy({
      by: ['createdAt'],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Process time series data for charts
    const monthlySales = new Map();
    const monthlyOrders = new Map();

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = date.toISOString().slice(0, 7); // YYYY-MM format
      monthlySales.set(monthKey, 0);
      monthlyOrders.set(monthKey, 0);
    }

    // Aggregate sales data
    salesOverTime.forEach((item) => {
      const monthKey = item.createdAt.toISOString().slice(0, 7);
      const current = monthlySales.get(monthKey) || 0;
      monthlySales.set(monthKey, current + (item._sum.amount || 0));
    });

    // Aggregate orders data
    ordersOverTime.forEach((item) => {
      const monthKey = item.createdAt.toISOString().slice(0, 7);
      const current = monthlyOrders.get(monthKey) || 0;
      monthlyOrders.set(monthKey, current + (item._count.id || 0));
    });

    // Convert to arrays for chart display
    const salesOverTimeData = Array.from(monthlySales.values());
    const ordersOverTimeData = Array.from(monthlyOrders.values());
    const monthLabels = Array.from(monthlySales.keys()).map(month => {
      const date = new Date(month + '-01');
      return date.toLocaleDateString('en-US', { month: 'short' });
    });

    // Get total users count
    const totalUsers = await prisma.users.count();

    // Get total products count
    const totalProducts = await prisma.products.count();

    // Get low stock products (stock < 10)
    const lowStockProducts = await prisma.products.count({
      where: {
        stock: {
          lt: 10,
        },
      },
    });

    res.status(200).json({
      success: true,
      data: {
        totalSales: totalSales._sum.amount || 0,
        totalOrders,
        totalRevenue,
        newCustomers,
        totalUsers,
        totalProducts,
        lowStockProducts,
        topProducts: topProductsWithDetails,
        salesOverTime: salesOverTimeData,
        ordersOverTime: ordersOverTimeData,
        monthLabels,
      },
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default getAnalytics;