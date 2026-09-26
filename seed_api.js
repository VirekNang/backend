async function main() {
  // 1. Get Categories
  let catRes = await fetch('http://localhost:3000/categories');
  let categories = await catRes.json();
  let categoryId = categories.length > 0 ? categories[0].CategoryID : 0;
  
  if (categoryId === 0) {
    let catPost = await fetch('http://localhost:3000/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ CategoryName: 'General', Description: 'General items' })
    });
    let newCat = await catPost.json();
    categoryId = newCat.CategoryID || 1;
  }

  // 2. Get Brands
  let brandRes = await fetch('http://localhost:3000/brand');
  let brands = await brandRes.json();
  let brandId = brands.length > 0 ? brands[0].BrandID : 0;
  
  if (brandId === 0) {
    const FormData = require('form-data');
    const form = new FormData();
    form.append('BrandName', 'Generic Brand');
    let brandPost = await fetch('http://localhost:3000/brand', {
      method: 'POST',
      body: form
    });
    let newBrand = await brandPost.json();
    brandId = newBrand.data ? newBrand.data.BrandID : 1;
  }

  // 3. Post Items
  const items = [
    {
      ItemName: 'Coca Cola (1 box = 24 cans)',
      UnitOfMeasure: 'box',
      StockQuantity: 10,
      UnitPrice: 10.00,
      SalePrice: 15.00,
      Barcode: 'BOX-24CAN-001',
      BrandID: brandId,
      CategoryID: categoryId,
    },
    {
      ItemName: 'Coca Cola',
      UnitOfMeasure: 'can',
      StockQuantity: 100,
      UnitPrice: 0.50,
      SalePrice: 1.00,
      Barcode: 'CAN-001',
      BrandID: brandId,
      CategoryID: categoryId,
    },
    {
      ItemName: 'Apples',
      UnitOfMeasure: 'kg',
      StockQuantity: 50,
      UnitPrice: 2.00,
      SalePrice: 3.50,
      Barcode: 'APPLE-KG-001',
      BrandID: brandId,
      CategoryID: categoryId,
    },
    {
      ItemName: 'Salt',
      UnitOfMeasure: 'g',
      StockQuantity: 5000,
      UnitPrice: 0.01,
      SalePrice: 0.05,
      Barcode: 'SALT-G-001',
      BrandID: brandId,
      CategoryID: categoryId,
    }
  ];

  for (const item of items) {
    const FormData = require('form-data');
    const form = new FormData();
    for (const key in item) {
      form.append(key, String(item[key]));
    }
    const itemPost = await fetch('http://localhost:3000/items', {
      method: 'POST',
      body: form
    });
    const res = await itemPost.json();
    console.log(`Posted item: ${item.ItemName}`, res);
  }
}

main().catch(console.error);
