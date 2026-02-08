import Calculator from "./components/calculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-background py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            ROA Calculator
          </h1>
          <p className="mt-2 text-muted-foreground">
            Calculate your Break Even ROAS in seconds
          </p>
        </div>
        <Calculator />
      </div>
    </main>
  );
}
