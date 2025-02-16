import { Text } from "@mantine/core";

interface CategoryCardProps {
  name: string;
  onClick?: () => void;
}

export function CategoryCard({ name, onClick }: CategoryCardProps) {
  return (
    <div 
      className="bg-white rounded-md shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="w-full h-32 bg-gray-200 rounded-md mb-4" />
      <Text fw={500}>{name}</Text>
    </div>
  );
} 