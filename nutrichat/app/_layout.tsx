import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot /> {/* This renders the current route (e.g., index.tsx) */}
    </AuthProvider>
  );
}