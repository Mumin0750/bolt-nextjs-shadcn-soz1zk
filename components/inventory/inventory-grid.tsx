"use client";

import { Product, Stock } from '@/lib/types';
import { CATEGORY_NAMES } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InventoryGridProps {
  products: Product[];
  stock: Stock[];
  showId: number;
  onUpdateStock?: (productId: string, quantity: number) => void;
  readOnly?: boolean;
}

export function InventoryGrid({
  products,
  stock,
  showId,
  onUpdateStock,
  readOnly = false
}: InventoryGridProps) {
  const getStockQuantity = (productId: string) => {
    const stockItem = stock.find(s => s.productId === productId && s.showId === showId);
    return stockItem?.quantity || 0;
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
                      {readOnly ? (
                        <div className="text-sm text-gray-500">
                          {getStockQuantity(product.id)}
                        </div>
                      ) : (
                        <Input
                          type="number"
                          min="0"
                          value={getStockQuantity(product.id)}
                          onChange={(e) => onUpdateStock?.(product.id, parseInt(e.target.value) || 0)}
                          className="w-24 mx-auto mt-1"
                        />
                      )}
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