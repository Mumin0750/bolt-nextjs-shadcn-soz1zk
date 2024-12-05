"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { StatusSelector } from '@/components/status/status-selector';
import { AdminControls } from '@/components/admin/admin-controls';
import { PRODUCTS, initialShowStatuses } from '@/lib/data';
import { User, Stock, ShowStatus, Product } from '@/lib/types';
import { getStoredStock, setStoredStock, getStoredStatuses, setStoredStatuses, getStoredProducts, setStoredProducts } from '@/lib/storage';
import { PageContainer } from '@/components/layout/page-container';
import { Section } from '@/components/layout/section';
import { Card } from '@/components/layout/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { InventoryGrid } from '@/components/inventory/inventory-grid';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [selectedShow, setSelectedShow] = useState<number | null>(null);
  const [showStatuses, setShowStatuses] = useState<ShowStatus[]>(initialShowStatuses);
  const [stock, setStock] = useState<Stock[]>([]);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'admin') {
      router.push('/');
      return;
    }

    setUser(parsedUser);
    
    const storedStock = getStoredStock();
    const storedStatuses = getStoredStatuses();
    const storedProducts = getStoredProducts();
    
    if (storedStock.length) setStock(storedStock);
    if (storedStatuses.length) setShowStatuses(storedStatuses);
    if (storedProducts.length) setProducts(storedProducts);
  }, [router]);

  // Calculate total quantities for each product across all shows
  const calculateTotalStock = () => {
    const totalStock: Stock[] = [];
    
    products.forEach(product => {
      const totalQuantity = stock.reduce((sum, item) => {
        if (item.productId === product.id) {
          return sum + item.quantity;
        }
        return sum;
      }, 0);
      
      totalStock.push({
        showId: -1, // Special ID for totals
        productId: product.id,
        quantity: totalQuantity,
        lastUpdated: new Date().toISOString()
      });
    });
    
    return totalStock;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <PageContainer>
        <Section title="Admin Dashboard">
          <AdminControls
            onResetAllQuantities={() => {
              setStock([]);
              setStoredStock([]);
            }}
            onResetAllStatuses={() => {
              const resetStatuses = showStatuses.map(status => ({
                ...status,
                status: 'Incomplete' as const,
                lastUpdated: new Date().toISOString()
              }));
              setShowStatuses(resetStatuses);
              setStoredStatuses(resetStatuses);
            }}
            onAddProduct={(newProduct) => {
              const id = `c${newProduct.category.slice(-1)}_${products.length + 1}`;
              const product: Product = { ...newProduct, id };
              const updatedProducts = [...products, product];
              setProducts(updatedProducts);
              setStoredProducts(updatedProducts);
            }}
          />
        </Section>

        <Section>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Show</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {showStatuses.map((status) => (
                  <TableRow 
                    key={status.showId}
                    className={cn(
                      "cursor-pointer hover:bg-gray-50",
                      status.status === 'Complete' ? "bg-green-50" : "bg-red-50"
                    )}
                    onClick={() => setSelectedShow(status.showId)}
                  >
                    <TableCell>Show {status.showId}</TableCell>
                    <TableCell>
                      <StatusSelector
                        status={status.status}
                        onChange={() => {}}
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(status.lastUpdated).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Section>
        
        <Section>
          <Tabs defaultValue="totals" className="space-y-4">
            <TabsList>
              <TabsTrigger value="totals">Show-T (Totals)</TabsTrigger>
              {selectedShow && (
                <TabsTrigger value="show">Show {selectedShow}</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="totals">
              <Card>
                <h3 className="text-xl font-semibold mb-4">Total Quantities (Show-T)</h3>
                <InventoryGrid
                  products={products}
                  stock={calculateTotalStock()}
                  showId={-1}
                  readOnly
                />
              </Card>
            </TabsContent>
            
            {selectedShow && (
              <TabsContent value="show">
                <Card>
                  <h3 className="text-xl font-semibold mb-4">Show {selectedShow} Inventory</h3>
                  <InventoryGrid
                    products={products}
                    stock={stock}
                    showId={selectedShow}
                    readOnly
                  />
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </Section>
      </PageContainer>
    </div>
  );
}