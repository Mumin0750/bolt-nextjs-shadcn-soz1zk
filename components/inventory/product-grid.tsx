"use client";

import { Product, Stock } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { CATEGORY_NAMES } from '@/lib/constants';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from '@/components/layout/card';

interface ProductGridProps {
  products: Product[];
  stock: Stock[];
  showId: number;
  onUpdateStock: (productId: string, quantity: number) => void;
  readOnly?: boolean;
}

export function ProductGrid({
  products,
  stock,
  showId,
  onUpdateStock,
  readOnly = false,
}: ProductGridProps) {
  const categories = Object.keys(CATEGORY_NAMES) as Array<keyof typeof CATEGORY_NAMES>;
  
  const getStockQuantity = (productId: string) => {
    const stockItem = stock.find(s => s.productId === productId && s.showId === showId);
    return stockItem?.quantity || 0;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {categories.map(category => {
        const categoryProducts = products.filter(p => p.category === category);
        if (categoryProducts.length === 0) return null;

        return (
          <Card key={category} className="lg:col-span-1">
            <div className="border-b pb-4 mb-4">
              <h3 className="text-lg font-semibold">{CATEGORY_NAMES[category]}</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المنتج</TableHead>
                  <TableHead>الكمية</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      {readOnly ? (
                        <span>{getStockQuantity(product.id)}</span>
                      ) : (
                        <Input
                          type="number"
                          min="0"
                          value={getStockQuantity(product.id)}
                          onChange={(e) => onUpdateStock(product.id, parseInt(e.target.value) || 0)}
                          className="w-24"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        );
      })}
    </div>
  );
}