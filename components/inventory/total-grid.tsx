"use client";

import { Product, Stock } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TotalGridProps {
  products: Product[];
  stock: Stock[];
}

export function TotalGrid({ products, stock }: TotalGridProps) {
  const categories = ['Column1', 'Column2', 'Column3', 'Column4', 'Column5'];
  const categoryNames = {
    Column1: 'Column 1',
    Column2: 'Column 2',
    Column3: 'Column 3',
    Column4: 'Column 4',
    Column5: 'Column 5'
  };
  
  const getTotalQuantity = (productId: string) => {
    return stock
      .filter(s => s.productId === productId)
      .reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="space-y-6">
      {categories.map(category => {
        const categoryProducts = products.filter(p => p.category === category);
        if (categoryProducts.length === 0) return null;

        return (
          <div key={category} className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">{categoryNames[category]}</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Total Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryProducts.map(product => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{getTotalQuantity(product.id)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
}