export function MyMealsHeader() {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Your Meals
      </h1>
      <p className="text-muted-foreground">
        Build your own meal library. Add foods with name, default quantity, and
        calories per 100g—then use them when logging in Food Log.
      </p>
    </div>
  );
}
