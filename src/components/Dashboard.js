import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { CheckIcon, FilePenIcon, MoveVerticalIcon } from "lucide-react";
import { useCategoriser } from "./CategoriserContext";

export function Dashboard() {
  const {
    transcript,
    categories,
    handleTextCategoryChange,
    addCategory,
    updateCategory,
  } = useCategoriser();

  const [editingCategory, setEditingCategory] = React.useState(null);
  const [newCategory, setNewCategory] = React.useState({
    label: "",
    color: "#000000",
    shortcut: "",
  });

  const handleAddCategory = () => {
    if (newCategory.label && newCategory.color && newCategory.shortcut) {
      addCategory(newCategory);
      setNewCategory({ label: "", color: "#000000", shortcut: "" });
    }
  };

  const handleCategoryEdit = (category) => {
    setEditingCategory(category);
  };

  const handleCategorySave = (updatedCategory) => {
    updateCategory(updatedCategory);
    setEditingCategory(null);
  };

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="grid grid-cols-[1fr_300px] gap-4">
        <div className="bg-muted rounded-md p-4">
          <h2 className="text-lg font-bold mb-2">Transcript</h2>
          <div className="space-y-2">
            {transcript.map((item) => (
              <div
                key={item.id}
                className="bg-background rounded-md p-2 flex items-center justify-between"
                style={{
                  borderLeft: `4px solid ${
                    categories.find((c) => c.id === item.category).color
                  }`,
                  backgroundColor: categories.find(
                    (c) => c.id === item.category
                  ).color,
                  color:
                    categories.find((c) => c.id === item.category).color +
                    "-foreground",
                }}
              >
                <div className="text-sm">{item.text}</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoveVerticalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category.id}
                        onSelect={() =>
                          handleTextCategoryChange(item.id, category.id)
                        }
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span>
                            {category.label} ({category.shortcut})
                          </span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-muted rounded-md p-4">
          <h2 className="text-lg font-bold mb-2">Categories</h2>
          <div className="space-y-2 border border-gray-300 p-4 rounded-md">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between"
              >
                {editingCategory?.id === category.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingCategory.label}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          label: e.target.value,
                        })
                      }
                      className="bg-transparent border-b border-muted focus:outline-none"
                    />
                    <input
                      type="color"
                      value={editingCategory.color}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          color: e.target.value,
                        })
                      }
                      className="w-8 h-8 border-none rounded-full cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span>
                      {category.label} ({category.shortcut})
                    </span>
                  </div>
                )}
                <div className="flex gap-2">
                  {editingCategory?.id === category.id ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCategorySave(editingCategory)}
                    >
                      <CheckIcon className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCategoryEdit(category)}
                    >
                      <FilePenIcon className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold mb-2">Add New Category</h3>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="newCategoryColor"
                  className="text-sm font-medium"
                >
                  Color
                </label>
                <Input
                  id="newCategoryColor"
                  type="color"
                  value={newCategory.color}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, color: e.target.value })
                  }
                  className="w-20 h-15 p-2 border-none rounded cursor-pointer"
                />
              </div>
              <Input
                type="text"
                placeholder="Label"
                value={newCategory.label}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, label: e.target.value })
                }
                className="w-full"
              />
              <Input
                type="text"
                placeholder="Shortcut"
                value={newCategory.shortcut}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, shortcut: e.target.value })
                }
                className="w-full"
              />
              <Button
                onClick={() => {
                  handleAddCategory();
                  setIsAddCategoryModalOpen(false);
                }}
                className="w-full"
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
