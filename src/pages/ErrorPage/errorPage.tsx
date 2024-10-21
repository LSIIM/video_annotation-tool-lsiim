import Header from "@/components/Header";

export default function ErrorPage() {
  return (
    <div className='flex-col h-screen w-screen'>
      <Header />
      <div className="flex justify-center mt-10">
        <div className="flex-col">
          <p className="text-7xl font-bold">404</p>
          <p className="mx-8">Page not found</p>
        </div>
      </div>
    </div>
  );
}