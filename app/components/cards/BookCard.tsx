import { Card, Text } from "@mantine/core";

interface BookCardProps {
  title: string;
  author: string;
  onClick?: () => void;
}

export function BookCard({ title, author, onClick }: BookCardProps) {
  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      className="bg-white cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
      <Text fw={500}>{title}</Text>
      <Text size="sm" c="dimmed">{author}</Text>
    </Card>
  );
} 