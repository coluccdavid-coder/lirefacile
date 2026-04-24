"use client";

import { Suspense } from "react";
import ExercisesContent from "./ExercisesContent";

export default function ExercisesPage() {
  return (
    <Suspense fallback={<div>Chargement des exercices...</div>}>
      <ExercisesContent />
    </Suspense>
  );
}
