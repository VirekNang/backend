import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Get or create category
  let category = await prisma.categories.findFirst();
  if (!category) {
    category = await prisma.categories.create({
      data: {
        CategoryName: 'General',
        Description: 'General items',
        Thumnail: '',
      },
    });
  }

  // Get or create brand
  let brand = await prisma.brand.findFirst();
  if (!brand) {
    brand = await prisma.brand.create({
      data: {
        BrandName: 'Generic Brand',
        Description: 'Generic Brand',
        Image: '',
      },
    });
  }

  const items = [
    {
      ItemName: 'Coca Cola (1 box = 24 cans)',
      UnitOfMeasure: 'box',
      StockQuantity: 10,
      UnitPrice: 10.00,
      SalePrice: 15.00,
      Barcode: 'BOX-24CAN-001',
      BrandID: brand.BrandID,
      CategoryID: category.CategoryID,
    },
    {
      ItemName: 'Coca Cola',
      UnitOfMeasure: 'can',
      StockQuantity: 100,
      UnitPrice: 0.50,
      SalePrice: 1.00,
      Barcode: 'CAN-001',
      BrandID: brand.BrandID,
      CategoryID: category.CategoryID,
    },
    {
      ItemName: 'Apples',
      UnitOfMeasure: 'kg',
      StockQuantity: 50,
      UnitPrice: 2.00,
      SalePrice: 3.50,
      Barcode: 'APPLE-KG-001',
      BrandID: brand.BrandID,
      CategoryID: category.CategoryID,
    },
    {
      ItemName: 'Salt',
      UnitOfMeasure: 'g',
      StockQuantity: 5000,
      UnitPrice: 0.01,
      SalePrice: 0.05,
      Barcode: 'SALT-G-001',
      BrandID: brand.BrandID,
      CategoryID: category.CategoryID,
    }
  ];

  for (const item of items) {
    const exists = await prisma.item.findFirst({ where: { Barcode: item.Barcode } });
    if (!exists) {
      await prisma.item.create({ data: item });
      console.log(`Created item: ${item.ItemName}`);
    } else {
      console.log(`Item already exists: ${item.ItemName}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
