import productService from "../../services/product.service";

let ProductService = "ProductService";

jest.mock("../../services/product.service", () => ({
  getAllProducts: jest.fn(),
  addProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
}));

jest.mock("axios");

describe(ProductService, () => {
  const mockProducts = [
    {
      _id: "1",
      name: "Product 1",
      price: 10,
      description: "Description 1",
      image: "image1.jpg",
      featured: false,
    },
    {
      _id: "2",
      name: "Product 2",
      price: 100,
      description: "Description 1",
      image: "image1.jpg",
      featured: false,
    },
  ];

  const mockError = new Error("An error occurred");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("functional", () => {
    test(`${ProductService} functional should get all product`, async () => {
      productService.getAllProducts.mockResolvedValue(mockProducts);
      expect(await productService.getAllProducts()).toEqual(mockProducts);
      expect(productService.getAllProducts).toHaveBeenCalled();
    });

    test(`${ProductService} functional should throw when getAllProducts fails`, async () => {
      productService.getAllProducts.mockRejectedValue(mockError);
      await expect(productService.getAllProducts()).rejects.toThrow();
      expect(productService.getAllProducts).toHaveBeenCalled();
    });

    test(`${ProductService} functional should add a new product`, async () => {
      const { _id, ...restData } = mockProducts[0];
      productService.addProduct.mockResolvedValue(mockProducts[0]);
      expect(await productService.addProduct(restData)).toEqual(
        mockProducts[0]
      );
      expect(productService.addProduct).toHaveBeenCalledWith(restData);
    });

    test(`${ProductService} functional should update product by ID`, async () => {
      const { _id, ...restData } = mockProducts[0];
      productService.updateProduct.mockResolvedValue({
        ...mockProducts[0],
        name: "new name",
      });
      expect(
        await productService.updateProduct(_id, {
          ...restData,
          name: "new name",
        })
      ).toEqual({
        ...mockProducts[0],
        name: "new name",
      });
      expect(productService.updateProduct).toHaveBeenCalledWith(_id, {
        ...restData,
        name: "new name",
      });
    });

    test(`${ProductService} functional should delete product by ID`, async () => {
      const { _id, ...restData } = mockProducts[0];
      productService.deleteProduct.mockResolvedValue(mockProducts[0]);
      expect(await productService.deleteProduct("1")).toEqual(mockProducts[0]);
      expect(productService.deleteProduct).toHaveBeenCalledWith(_id);
    });
  });
});
