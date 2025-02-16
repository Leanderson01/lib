'use client'
import { Button } from "@mantine/core";
// import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ['livros'],
  //   queryFn: () => fetch('http://suzuma.castleman.net/api/livros').then(res => res.json())
  // });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* testar componente mantine */}
      {/* testar react-query */}
      <Button onClick={() => {
        // console.log(data);
      }}>Teste</Button>
    </div>
  );
}
