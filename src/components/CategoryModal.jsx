import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategoriser } from "./CategoriserContext";

export function CategoryModal({ isOpen, onClose }) {
  const { categories, addCategory, removeCategory, updateCategory } = useCategoriser();
  const [newCategory, setNewCategory] = useState({ label: '', color: '#000000', shortcut: '' });

  if (!isOpen) return null;

  const handleAddCategory = () => {
    if (newCategory.label.trim() && newCategory.color && newCategory.shortcut) {
      addCategory(newCategory);
      setNewCategory({ label: '', color: '#000000', shortcut: '' });
    }
  };

  const handleUpdateCategory = (id, field, value) => {
    const updatedCategory = categories.find(cat => cat.id === id);
    if (updatedCategory) {
      updateCategory({ ...updatedCategory, [field]: value });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal-background p-6 rounded-lg border border-gray-300 shadow-lg" style={{ borderRadius: '12px', maxWidth: '90%', width: '500px' }}>
        <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="flex items-center space-x-2 mb-2">
              <Input
                type="text"
                value={category.label}
                onChange={(e) => handleUpdateCategory(category.id, 'label', e.target.value)}
                className="flex-grow w-20"
              />
              <Input
                type="color"
                value={category.color}
                onChange={(e) => handleUpdateCategory(category.id, 'color', e.target.value)}
                className="w-12 h-11 p-2 border-0"
              />
              <Input
                type="text"
                value={category.shortcut}
                onChange={(e) => handleUpdateCategory(category.id, 'shortcut', e.target.value)}
                className="w-20"
              />
              <Button className="w-20" variant="destructive" onClick={() => removeCategory(category.id)}>Remove</Button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center space-x-2">
          <Input
            type="text"
            value={newCategory.label}
            onChange={(e) => setNewCategory({...newCategory, label: e.target.value})}
            placeholder="New category name"
            className="flex-grow w-20"
          />
          <Input
            type="color"
            value={newCategory.color}
            onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
            className="w-12 h-11 p-2 border-0"
          />
          <Input
            type="text"
            value={newCategory.shortcut}
            onChange={(e) => setNewCategory({...newCategory, shortcut: e.target.value})}
            placeholder="Shortcut"
            className="w-20"
          />
          <Button className="w-20" onClick={handleAddCategory}>Add</Button>
        </div>
        <Button onClick={onClose} className="mt-4">Close</Button>
      </div>
    </div>
  );
}
