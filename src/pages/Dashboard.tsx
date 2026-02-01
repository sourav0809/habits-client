import { useMe } from "@/modules/auth/hooks";

export default function Dashboard() {
  const { data } = useMe();
  const userName = data?.user?.name ?? "there";

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Welcome, {userName}
      </h1>
      <p className="text-muted-foreground">
        You're logged in. This is your dashboard. Track your habits, calories,
        and water intake from here.
      </p>
    </div>
  );
}
