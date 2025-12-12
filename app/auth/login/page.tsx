import { LoginGoogleButton } from "@/components/auth/login/ui/LoginGoogleButton";

export default function LoginPage() {
  return (
    <div className="p-10 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Ingresar</h1>

      <LoginGoogleButton />
    </div>
  );
}
