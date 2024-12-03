import UploadForm from "@/components/upload-form";

export default function Page() {
  return (
    <main className="container mx-auto py-12">
      <h1 className="font-bold text-4xl">Post an Item to sell</h1>
      <UploadForm />
    </main>
  );
}
