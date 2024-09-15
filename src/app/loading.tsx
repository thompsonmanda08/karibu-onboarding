import Loader from "@/components/Loader";

export default function LoadingPage({ loadingText }: { loadingText?: string }) {
  return (
    <div className="w-full h-[85vh] grid place-content-center place-items-center">
      <Loader loadingText={loadingText} />
    </div>
  );
}
