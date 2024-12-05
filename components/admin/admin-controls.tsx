"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NewProduct, Category } from '@/lib/types';
import { CATEGORY_NAMES } from '@/lib/constants';

interface AdminControlsProps {
  onResetAllQuantities: () => void;
  onResetAllStatuses: () => void;
  onAddProduct: (product: NewProduct) => void;
}

export function AdminControls({
  onResetAllQuantities,
  onResetAllStatuses,
  onAddProduct,
}: AdminControlsProps) {
  const [newProduct, setNewProduct] = useState<NewProduct>({ 
    name: '', 
    category: 'Column1' 
  });

  const handleAddProduct = () => {
    if (newProduct.name.trim()) {
      onAddProduct(newProduct);
      setNewProduct({ name: '', category: 'Column1' });
    }
  };

  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      <Button 
        variant="destructive" 
        onClick={onResetAllQuantities}
      >
        Reset All Quantities
      </Button>
      
      <Button 
        variant="destructive" 
        onClick={onResetAllStatuses}
      >
        Reset All Statuses
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add New Product</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Select
                value={newProduct.category}
                onValueChange={(value: Category) => 
                  setNewProduct(prev => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(CATEGORY_NAMES) as Category[]).map((category) => (
                    <SelectItem key={category} value={category}>
                      {CATEGORY_NAMES[category]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddProduct} className="w-full">Add Product</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}