import * as httpMocks from 'node-mocks-http';
import * as productService from '../../../../src/modules/products/api/v1/service';
import { default as productController } from '../../../../src/modules/products/api/v1/controller';
import { mockCreateProductRequestBody } from '../../../__mocks__';

describe('product-controller-tests', () => {
  const next = jest.fn();

  it('01. should add a product successfully', () => {
    jest.spyOn(productService, 'createProductSrc').mockResolvedValue(true);
    const req = httpMocks.createRequest({
      method: 'post',
      url: '/',
      body: mockCreateProductRequestBody,
    });
    const res = httpMocks.createResponse();
    productController(req, res, next);
    expect(res.statusCode).toBe(200);
  });
});
