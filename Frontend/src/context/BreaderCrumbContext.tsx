import * as React from "react";

interface BreadcrumbItem {
  url: string;
  name: string;
}

interface BreadcrumbContextType {
  items: BreadcrumbItem[];
  addItem: (item: BreadcrumbItem) => void;
  removeItem: (url: string) => void;
  updateItem: (oldUrl: string, newItem: BreadcrumbItem) => void;
  clearItems: () => void;
}

const BreadcrumbContext = React.createContext<BreadcrumbContextType | undefined>(
  undefined
);

export const BreadcrumbProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = React.useState<BreadcrumbItem[]>([]);

  const addItem = (item: BreadcrumbItem) => {
    setItems((prev) => {
      // Avoid duplicates
      if (!prev.some((i) => i.url === item.url)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeItem = (url: string) => {
    setItems((prev) => prev.filter((item) => item.url !== url));
  };

  const updateItem = (oldUrl: string, newItem: BreadcrumbItem) => {
    setItems((prev) =>
      prev.map((item) => (item.url === oldUrl ? newItem : item))
    );
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <BreadcrumbContext.Provider
      value={{ items, addItem, removeItem, updateItem, clearItems }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = React.useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};