import { useState } from 'react';
import { useItems } from '../hooks/useItems';
import type { Item, CreateItemInput, UpdateItemInput } from '../lib/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { Trash2, Edit, Plus, Search, X } from 'lucide-react';

export function ItemsManagement() {
  const {
    items,
    pagination,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    setQueryParams,
  } = useItems({ page: 1, limit: 10 });

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Form state
  const [formData, setFormData] = useState<CreateItemInput>({
    name: '',
    description: '',
    price: 0,
    category: '',
    inStock: true,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createItem(formData);
      setIsCreating(false);
      setFormData({ name: '', description: '', price: 0, category: '', inStock: true });
    } catch (err) {
      console.error('Failed to create item:', err);
    }
  };

  const handleUpdate = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    try {
      const updateData: UpdateItemInput = {
        name: formData.name || undefined,
        description: formData.description || undefined,
        price: formData.price || undefined,
        category: formData.category || undefined,
        inStock: formData.inStock,
      };
      await updateItem(id, updateData);
      setEditingId(null);
      setFormData({ name: '', description: '', price: 0, category: '', inStock: true });
    } catch (err) {
      console.error('Failed to update item:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
      } catch (err) {
        console.error('Failed to delete item:', err);
      }
    }
  };

  const startEdit = (item: Item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      description: item.description || '',
      price: item.price,
      category: item.category,
      inStock: item.inStock,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({ name: '', description: '', price: 0, category: '', inStock: true });
  };

  const handleSearch = () => {
    setQueryParams({
      page: 1,
      limit: 10,
      search: searchTerm || undefined,
      category: categoryFilter || undefined,
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setQueryParams({ page: 1, limit: 10 });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Items Management</CardTitle>
          <CardDescription>Manage your items with full CRUD operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Filter by category..."
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            {(searchTerm || categoryFilter) && (
              <Button onClick={clearFilters} variant="ghost">
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Create Form */}
          {isCreating && (
            <Card className="border-primary">
              <CardHeader>
                <CardTitle>Create New Item</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="inStock">In Stock</Label>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit">Create</Button>
                    <Button type="button" variant="outline" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Items Table */}
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No items found
                        </TableCell>
                      </TableRow>
                    ) : (
                      items.map((item) =>
                        editingId === item.id ? (
                          <TableRow key={item.id}>
                            <TableCell colSpan={6}>
                              <form onSubmit={(e) => handleUpdate(e, item.id)} className="space-y-4 p-4 bg-muted/50 rounded">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor={`edit-name-${item.id}`}>Name</Label>
                                    <Input
                                      id={`edit-name-${item.id}`}
                                      value={formData.name}
                                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`edit-price-${item.id}`}>Price</Label>
                                    <Input
                                      id={`edit-price-${item.id}`}
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      value={formData.price}
                                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`edit-category-${item.id}`}>Category</Label>
                                    <Input
                                      id={`edit-category-${item.id}`}
                                      value={formData.category}
                                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    />
                                  </div>
                                  <div className="flex items-center space-x-2 pt-6">
                                    <input
                                      type="checkbox"
                                      id={`edit-inStock-${item.id}`}
                                      checked={formData.inStock}
                                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                                      className="h-4 w-4"
                                    />
                                    <Label htmlFor={`edit-inStock-${item.id}`}>In Stock</Label>
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor={`edit-description-${item.id}`}>Description</Label>
                                  <Input
                                    id={`edit-description-${item.id}`}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button type="submit" size="sm">Save</Button>
                                  <Button type="button" variant="outline" size="sm" onClick={cancelEdit}>
                                    Cancel
                                  </Button>
                                </div>
                              </form>
                            </TableCell>
                          </TableRow>
                        ) : (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{item.description || '-'}</TableCell>
                            <TableCell>${item.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={item.inStock ? 'default' : 'secondary'}>
                                {item.inStock ? 'In Stock' : 'Out of Stock'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => startEdit(item)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      )
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Info */}
              {pagination && (
                <div className="text-sm text-muted-foreground text-center">
                  Showing {items.length} of {pagination.total} items
                  {pagination.totalPages > 1 && (
                    <span> (Page {pagination.page} of {pagination.totalPages})</span>
                  )}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

