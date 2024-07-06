import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card"; // Update path as per your project structure

function FactsSection() {
  return (
    <section className="mb-[10em]">
      <h2 className="text-2xl font-semibold mb-8">Some facts about us :)</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Fact 1 */}
        <Card className="max-w-sm rounded-lg border bg-card text-card-foreground shadow-lg overflow-hidden">
          <CardHeader className="px-6 py-4">
            <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
              Fact 1
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <CardDescription className="text-sm text-muted-foreground">
              Born from frustration, our app started as a weekend project that
              revolutionized task management.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Fact 2 */}
        <Card className="max-w-sm rounded-lg border bg-card text-card-foreground shadow-lg overflow-hidden">
          <CardHeader className="px-6 py-4">
            <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
              Fact 2
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <CardDescription className="text-sm text-muted-foreground">
              We've innovated with a unique gamification system, rewarding users
              with badges and perks for completing tasks early.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Fact 3 */}
        <Card className="max-w-sm rounded-lg border bg-card text-card-foreground shadow-lg overflow-hidden">
          <CardHeader className="px-6 py-4">
            <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
              Fact 3
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <CardDescription className="text-sm text-muted-foreground">
              Our collaborative tools have facilitated millions of team
              interactions globally, enhancing productivity and teamwork.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Fact 4 */}
        <Card className="max-w-sm rounded-lg border bg-card text-card-foreground shadow-lg overflow-hidden">
          <CardHeader className="px-6 py-4">
            <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
              Fact 4
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <CardDescription className="text-sm text-muted-foreground">
              We lead with blockchain technology for secure task tracking,
              ensuring transparency and data integrity.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Fact 5 */}
        <Card className="max-w-sm rounded-lg border bg-card text-card-foreground shadow-lg overflow-hidden">
          <CardHeader className="px-6 py-4">
            <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
              Fact 5
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <CardDescription className="text-sm text-muted-foreground">
              With a global remote team spanning 15 countries and 12 languages,
              our culture embraces diversity and flexibility.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default FactsSection;
