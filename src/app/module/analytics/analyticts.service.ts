import { Order } from '../order/order.model';
import { Product_model } from '../product/product.model';
import { productFeedback } from '../productFeedback/productFeedback.model';
import { User } from '../user/user.model';

const getTotalCountWithLastMonthPercentage = async () => {
  const startOfLastMonth = new Date();
  startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
  startOfLastMonth.setDate(1);
  startOfLastMonth.setHours(0, 0, 0, 0);

  const endOfLastMonth = new Date(startOfLastMonth);
  endOfLastMonth.setMonth(endOfLastMonth.getMonth() + 1);
  endOfLastMonth.setDate(0);
  endOfLastMonth.setHours(23, 59, 59, 999);

  const totalProducts = await Product_model.countDocuments();
  const totalFeedbacks = await productFeedback.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalOrders = await Order.countDocuments();

  const lastMonthProducts = await Product_model.countDocuments({
    createdAt: {
      $gte: startOfLastMonth,
      $lte: endOfLastMonth,
    },
  });

  const lastMonthFeedbacks = await productFeedback.countDocuments({
    createdAt: {
      $gte: startOfLastMonth,
      $lte: endOfLastMonth,
    },
  });

  const lastMonthUsers = await User.countDocuments({
    createdAt: {
      $gte: startOfLastMonth,
      $lte: endOfLastMonth,
    },
  });

  const lastMonthOrders = await Order.countDocuments({
    createdAt: {
      $gte: startOfLastMonth,
      $lte: endOfLastMonth,
    },
  });

  return {
    totalProducts,
    lastMonthProductPercentage: totalProducts
      ? (lastMonthProducts / totalProducts) * 100
      : 0,
    totalFeedbacks,
    lastMonthFeedbackPercentage: totalFeedbacks
      ? (lastMonthFeedbacks / totalFeedbacks) * 100
      : 0,
    totalUsers,
    lastMonthUserPercentage: totalUsers
      ? (lastMonthUsers / totalUsers) * 100
      : 0,
    totalOrders,
    lastMonthOrderPercentage: totalOrders
      ? (lastMonthOrders / totalOrders) * 100
      : 0,
  };
};

const getLastSavenTotalSales = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);

  const salesData = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: sevenDaysAgo,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
        totalSales: { $sum: '$totalPrice' },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        sales: '$totalSales',
      },
    },
  ]);

  const result = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedSaleDate = date.toISOString().slice(0, 10);
    const salesForDate = salesData.find(
      (data) => data.date === formattedSaleDate,
    );
    result.push({
      date: formattedSaleDate,
      sales: salesForDate ? salesForDate.sales : 0,
    });
  }

  return result;
};

const totalSalePerMonthForAYear = async () => {
  const monthlySalesData = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`2024-01-01T00:00:00Z`),
          $lt: new Date(`${2024 + 1}-01-01T00:00:00Z`),
        },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        totalSales: { $sum: '$totalPrice' },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        totalSales: '$totalSales',
      },
    },
  ]);

  const result = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(i);
    const formattedSaleDate = date.toISOString().slice(0, 7);

    const salesForMonth = monthlySalesData.find(
      (sale) => sale.date === formattedSaleDate,
    );

    result.push({
      date: formattedSaleDate,
      totalSales: salesForMonth ? salesForMonth.totalSales : 0,
    });
  }

  return result;
};

const orderStatusOverview = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: '$orderStatus',
        total: { $sum: 1 },
      },
    },
  ]);

  return result;
};

const userStatusOverview = async () => {
  const result = await User.aggregate([
    {
      $group: {
        _id: '$status',
        total: { $sum: 1 },
      },
    },
  ]);

  return result;
};

const getTotalCountWithLastMonthPercentageForUser = async (userId: string) => {
  const startOfLastMonth = new Date();
  startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
  startOfLastMonth.setDate(1);
  startOfLastMonth.setHours(0, 0, 0, 0);

  const endOfLastMonth = new Date(startOfLastMonth);
  endOfLastMonth.setMonth(endOfLastMonth.getMonth() + 1);
  endOfLastMonth.setDate(0);
  endOfLastMonth.setHours(23, 59, 59, 999);

  const totalFeedbacks = await productFeedback.countDocuments({
    userId,
  });
  const totalOrders = await Order.countDocuments({
    user: userId,
  });

  const lastMonthFeedbacks = await productFeedback.countDocuments({
    createdAt: {
      $gte: startOfLastMonth,
      $lte: endOfLastMonth,
    },
  });

  const lastMonthOrders = await Order.countDocuments({
    createdAt: {
      $gte: startOfLastMonth,
      $lte: endOfLastMonth,
    },
  });

  return {
    totalFeedbacks,
    lastMonthFeedbackPercentage: totalFeedbacks
      ? (lastMonthFeedbacks / totalFeedbacks) * 100
      : 0,
    totalOrders,
    lastMonthOrderPercentage: totalOrders
      ? (lastMonthOrders / totalOrders) * 100
      : 0,
  };
};

export const AnalyticsService = {
  getTotalCountWithLastMonthPercentage,
  getLastSavenTotalSales,
  totalSalePerMonthForAYear,
  orderStatusOverview,
  userStatusOverview,
  getTotalCountWithLastMonthPercentageForUser,
};
