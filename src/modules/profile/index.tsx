import { User, Mail } from "lucide-react";
import { useMe } from "@/modules/auth/hooks";
import { Card, CardContent } from "@/components/ui/card";
import ProfileHeader from "./components/ProfileHeader";
import ProfileAvatar from "./components/ProfileAvatar";
import ProfileCard from "./components/ProfileCard";
import ProfilePageLoader from "./components/ProfilePageLoader";

const ProfileModule = () => {
  const { data, isPending, isError, error } = useMe();
  const user = data?.user;

  if (isPending) {
    return <ProfilePageLoader />;
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <ProfileHeader />
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error?.message ?? "Failed to load profile. Please try again."}
        </div>
      </div>
    );
  }

  const displayName = user?.name ?? "User";
  const displayEmail = user?.email ?? "";

  return (
    <div className="space-y-6">
      <ProfileHeader />

      {/* Profile Avatar Card */}
      <Card className="border-border/80 bg-card shadow-sm">
        <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:gap-6">
          <ProfileAvatar name={displayName} />
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              {displayName}
            </h2>
            <p className="text-sm text-muted-foreground">
              Habit tracking enthusiast
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <ProfileCard
          label="Full Name"
          value={displayName}
          icon={<User className="h-5 w-5" />}
        />
        <ProfileCard
          label="Email Address"
          value={displayEmail}
          icon={<Mail className="h-5 w-5" />}
        />
      </div>
    </div>
  );
};

export default ProfileModule;
