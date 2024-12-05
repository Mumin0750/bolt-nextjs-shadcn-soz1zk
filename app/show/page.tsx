"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { StatusSelector } from '@/components/status/status-selector';
import { PRODUCTS, initialShowStatuses } from '@/lib/data';
import { User, Stock, ShowStatus, Product } from '@/lib/types';
import { getStoredStock, setStoredStock, getStoredStatuses, setStoredStatuses, getStoredProducts } from '@/lib/storage';
import { PageContainer } from '@/components/layout/page-container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/layout/card';
import { InventoryGrid } from '@/components/inventory/inventory-grid';

export default function ShowPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [stock, setStock] = useState<Stock[]>([]);
  const [status, setStatus] = useState<ShowStatus | null>(null);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'show') {
      router.push('/');
      return;
    }

    setUser(parsedUser);
    
    // Load stored data
    const storedStock = getStoredStock();
    const storedStatuses = getStoredStatuses();
    const storedProducts = getStoredProducts();
    
    if (storedStock.length) setStock(storedStock);
    if (storedProducts.length) setProducts(storedProducts);
    
    const showStatus = (storedStatuses.length ? storedStatuses : initialShowStatuses)
      .find(s => s.showId === parsedUser.showNumber);
    if (showStatus) setStatus(showStatus);
  }, [router]);

  if (!user || !status) return null;

  const handleUpdateStock = (productId: string, quantity: number) => {
    const newStock = [...stock];
    const index = newStock.findIndex(s => s.showId === user.showNumber && s.productId === productId);
    
    if (index >= 0) {
      newStock[index] = {
        ...newStock[index],
        quantity,
        lastUpdated: new Date().toISOString()
      };
    } else {
      newStock.push({
        showId: user.showNumber!,
        productId,
        quantity,
        lastUpdated: new Date().toISOString()
      });
    }
    
    setStock(newStock);
    setStoredStock(newStock);
  };

  const handleStatusChange = (newStatus: 'Complete' | 'Incomplete') => {
    const updatedStatus = {
      showId: user.showNumber!,
      status: newStatus,
      lastUpdated: new Date().toISOString()
    };
    setStatus(updatedStatus);
    
    const storedStatuses = getStoredStatuses();
    const updatedStatuses = storedStatuses.length ? storedStatuses : initialShowStatuses;
    const statusIndex = updatedStatuses.findIndex(s => s.showId === user.showNumber);
    
    if (statusIndex >= 0) {
      updatedStatuses[statusIndex] = updatedStatus;
    } else {
      updatedStatuses.push(updatedStatus);
    }
    
    setStoredStatuses(updatedStatuses);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <PageContainer>
        <Section>
          <Card>
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Inventory Management</h2>
              <StatusSelector
                status={status.status}
                onChange={handleStatusChange}
              />
            </div>
            <InventoryGrid
              products={products}
              stock={stock}
              showId={user.showNumber!}
              onUpdateStock={handleUpdateStock}
            />
          </Card>
        </Section>
      </PageContainer>
    </div>
  );
}