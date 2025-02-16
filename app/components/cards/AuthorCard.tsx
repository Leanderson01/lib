import { Text } from "@mantine/core";

interface AuthorCardProps {
  name: string;
  onClick?: () => void;
}

export function AuthorCard({ name, onClick }: AuthorCardProps) {
  return (
    <div 
      className="bg-white rounded-md shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
      <Text fw={500} className="text-center">{name}</Text>
    </div>
  );
} 