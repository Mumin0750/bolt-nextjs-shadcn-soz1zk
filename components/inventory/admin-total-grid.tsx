"use client";

import { Product, Stock } from '@/lib/types';
import { CATEGORY_NAMES } from '@/lib/constants';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AdminTotalGridProps {
  products: Product[];
  stock: Stock[];
}

export function AdminTotalGrid({ products, stock }: AdminTotalGridProps) {
  const getTotalQuantity = (productId: string) => {
    return stock
      .filter(s => s.productId === productId)
      .reduce((total, item) => total + item.quantity, 0);
  };

  // Get all unique product names across all categories
  const allProductRows = products.reduce((acc, product) => {
    const maxLength = Math.max(acc.length, products.filter(p => p.category === product.category).length);
    return Array(maxLength).fill(null);
  }, []);

  // Group products by category
  const categorizedProducts = Object.keys(CATEGORY_NAMES).reduce((acc, category) => {
    acc[category] = products.filter(p => p.category === category);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.values(CATEGORY_NAMES).map((categoryName) => (
            <TableHead key={categoryName} className="text-center">
              {categoryName}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {allProductRows.map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Object.keys(CATEGORY_NAMES).map((category) => {
              const product = categorizedProducts[category][rowIndex];
              return (
                <TableCell key={`${category}-${rowIndex}`} className="text-center">
                  {product && (
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">
                        {getTotalQuantity(product.id)}
                      </div>
                    </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}