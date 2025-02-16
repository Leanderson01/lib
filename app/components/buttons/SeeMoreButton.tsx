import { Button } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface SeeMoreButtonProps {
  redirectTo: "books" | "categories" | "authors";
}

export function SeeMoreButton({ redirectTo }: SeeMoreButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    switch (redirectTo) {
      case "books":
        router.push("/books");
        break;
      case "categories":
        router.push("/categories");
        break;
      case "authors":
        router.push("/authors");
        break;
    }
  };

  return (
    <Button
      variant="subtle"
      rightSection={<ChevronRight size={16} />}
      className="!text-[#303A6B]"
      onClick={handleClick}
    >
      Ver mais
    </Button>
  );
} 