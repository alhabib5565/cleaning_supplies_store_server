import { Request, Response } from 'express';
import { product_services } from './product.service';
import { catchAsync } from '../../utils/catchAsync';
import httpStatus from 'http-status';

const create_product = catchAsync(async (req: Request, res: Response) => {
  const product = req.body;
  const result = await product_services.create_product_into_DB(product);

  res.status(200).json({
    success: true,
    message: 'product create successful',
    data: result,
  });
});

const get_all_products = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await product_services.get_all_products_from_DB(query);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'products retrived successful',
    data: result,
  });
});

const get_single_product = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await product_services.get_single_products_from_DB(id);

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Single product retrived successful',
    data: result,
  });
});

const addToFlashSale = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const result = await product_services.addToFlashSaleIntoDB(
    productId,
    req.body,
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Add to flash sale successful',
    data: result,
  });
});

const getAllFlashSaleProducts = catchAsync(
  async (req: Request, res: Response) => {
    const result = await product_services.getAllFlashSaleProducts();

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Flash sale products retrived  successful',
      data: result,
    });
  },
);

export const product_controller = {
  create_product,
  get_all_products,
  get_single_product,
  addToFlashSale,
  getAllFlashSaleProducts,
};
