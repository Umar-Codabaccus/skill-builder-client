import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import LessonProgressRow from "./LessonProgressRow";

describe("LessonProgressRow", () => {
    it("shows Start for lessons that have not started", () => {
        render(
            <LessonProgressRow
                lesson={{
                    lessonId: "lesson-1",
                    title: "Intro",
                    lessonProgressId: "00000000-0000-0000-0000-000000000000",
                    isCompleted: false,
                }}
                orderNumber={1}
                onStart={() => {}}
                onComplete={() => {}}
                actioning={false}
            />
        );

        expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
    });

    it("shows Continue for lessons that have started but are not completed", () => {
        render(
            <LessonProgressRow
                lesson={{
                    lessonId: "lesson-2",
                    title: "Middle",
                    lessonProgressId: "123e4567-e89b-12d3-a456-426614174000",
                    isCompleted: false,
                }}
                orderNumber={2}
                onStart={() => {}}
                onComplete={() => {}}
                actioning={false}
            />
        );

        expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
    });

    it("shows Watch for completed lessons", () => {
        render(
            <LessonProgressRow
                lesson={{
                    lessonId: "lesson-3",
                    title: "Finished",
                    lessonProgressId: "123e4567-e89b-12d3-a456-426614174000",
                    isCompleted: true,
                }}
                orderNumber={3}
                onStart={() => {}}
                onComplete={() => {}}
                actioning={false}
            />
        );

        expect(screen.getByRole("button", { name: /watch/i })).toBeInTheDocument();
    });
});
