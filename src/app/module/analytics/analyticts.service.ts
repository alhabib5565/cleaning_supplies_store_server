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
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // আজকের দিন পর্যন্ত
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

  // নিশ্চিতভাবে ৭ দিনের জন্য সেল ডেটা আনুন
  // const result = [];

  // for (let i = 6; i >= 0; i--) {
  //   const date = new Date();
  //   date.setDate(today.getDate() - i);
  //   const formattedDate = date.toISOString().slice(0, 10);
  //   const salesForDate = salesData.find((data) => data.date === formattedDate);
  //   result.push({
  //     date: formattedDate,
  //     sales: salesForDate ? salesForDate.sales : 0,
  //   });
  // }

  return salesData;
};

export const AnalyticsService = {
  getTotalCountWithLastMonthPercentage,
  getLastSavenTotalSales,
};
