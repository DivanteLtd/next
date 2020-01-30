import {
  getProductName,
  getProductSlug,
  getProductPrice,
  getProductGallery,
  getProductVariants,
  getProductAttributes
} from "./../src/index";

const product = {
  _name: "variant 1",
  _slug: "variant-1",
  price: {
    value: { centAmount: 1200 }
  },
  attributeList: [
    {
      name: "articleNumberManufacturer",
      stringValue: "H805 C195 85072",
      __typename: "StringAttribute"
    }
  ],
  images: [{ url: "imageV11/url.jpg" }, { url: "imageV12/url.jpg" }]
} as any;

describe("[commercetools-helpers] product helpers", () => {
  it("returns default values", () => {
    expect(getProductName(null)).toBe("");
    expect(getProductSlug(null)).toBe("");
    expect(getProductPrice(null)).toBe(null);
    expect(getProductGallery(null)).toEqual([]);
    expect(getProductVariants(null)).toEqual([]);
  });

  it("returns name", () => {
    expect(getProductName(product)).toBe("variant 1");
  });

  it("returns slug", () => {
    expect(getProductSlug(product)).toBe("variant-1");
  });

  it("returns price", () => {
    expect(getProductPrice(product)).toBe(12);
  });

  it("returns gallery", () => {
    expect(getProductGallery(product)).toEqual([
      {
        small: "imageV11/url.jpg",
        big: "imageV11/url.jpg",
        normal: "imageV11/url.jpg"
      },
      {
        small: "imageV12/url.jpg",
        big: "imageV12/url.jpg",
        normal: "imageV12/url.jpg"
      }
    ]);
  });

  it("returns master products", () => {
    const variants = [
      { _name: "variant 1", _master: false },
      { _name: "variant 2", _master: true }
    ];
    expect(getProductVariants(variants as any, { master: true })).toEqual({
      _name: "variant 2",
      _master: true
    });
  });

  it("returns all variants", () => {
    const variants = [
      { _name: "variant 1", _master: false },
      { _name: "variant 2", _master: true }
    ];
    expect(getProductVariants(variants as any)).toEqual(variants);
  });

  // Attributes

  it("returns product attributes", () => {
    const attributes = [
      {
        name: "articleNumberManufacturer",
        value: "H805 C195 85072",
        label: "H805 C195 85072"
      }
    ];

    expect(getProductAttributes(product)).toEqual(attributes);
  });

  it("returns filtered product attributes", () => {
    const product = {
      attributeList: [
        {
          name: "articleNumberManufacturer",
          stringValue: "H805 C195 85072",
          __typename: "StringAttribute"
        },
        {
          name: "color",
          stringValue: "H805 C195 85072",
          __typename: "StringAttribute"
        }
      ]
    } as any;

    const filteredattributeList = [
      { value: "H805 C195 85072", name: "color", label: "H805 C195 85072" }
    ];
    expect(getProductAttributes(product, ["color"])).toEqual(
      filteredattributeList
    );
  });

  it("returns empty array if there is no product", () => {
    const product = null
    expect(getProductAttributes(product)).toEqual([]);
  });
});
