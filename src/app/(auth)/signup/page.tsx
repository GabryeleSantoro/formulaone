import RegisterPreview from "@/components/registration-form";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-1">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full">
            <RegisterPreview />
          </div>
        </div>
      </div>
    </div>
  );
}
