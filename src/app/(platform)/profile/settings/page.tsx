import { cookies } from "next/headers";
import PasswordForm from "@/features/account/components/PasswordForm";
import ProfileForm from "@/features/account/components/ProfileForm";

async function getTokenPayload(): Promise<{ id?: string; role?: string } | null> {
  const store = await cookies();
  const token = store.get("token")?.value; 
  if (!token) return null;

  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString());
  } catch {
    return null;
  }
}

export default async function SettingsPage() {
  const payload = await getTokenPayload();

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
        <p className="mt-1 text-gray-500">
          Update your profile information and change your password
        </p>
      </div>

      <div className="space-y-6">
        <ProfileForm userId={payload?.id} role={payload?.role} />
        <PasswordForm />
      </div>
    </section>
  );
}