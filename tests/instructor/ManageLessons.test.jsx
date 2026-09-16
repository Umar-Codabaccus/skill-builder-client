import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ManageLessons from "../../src/instructor/ManageLessons";
import { createLesson, getLessonsByCourse, getMyCourses } from "../../src/api/instructor";

vi.mock("../../src/api/instructor", () => ({
  createLesson: vi.fn(),
  updateLesson: vi.fn(),
  deleteLesson: vi.fn(),
  getMyCourses: vi.fn(),
  getLessonsByCourse: vi.fn()
}));

describe("ManageLessons", () => {
  beforeEach(() => {
    vi.mocked(createLesson).mockReset();
    vi.mocked(createLesson).mockResolvedValue({});
    vi.mocked(getMyCourses).mockReset();
    vi.mocked(getLessonsByCourse).mockReset();
  });

  it("creates a lesson for the selected course", async () => {
    vi.mocked(getMyCourses).mockResolvedValue({ myCourses: [{ courseId: "abc123", title: "React Basics", description: "Intro course" }] });
    vi.mocked(getLessonsByCourse).mockResolvedValue({ lessons: [] });

    render(
      <MemoryRouter initialEntries={[{ pathname: "/instructor/course/abc123/lessons", state: { course: { courseId: "abc123", title: "React Basics", description: "Intro course" } } }]}>
        <Routes>
          <Route path="/instructor/course/:courseId/lessons" element={<ManageLessons />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/lesson title/i), {
      target: { value: "Intro to React" }
    });

    fireEvent.change(screen.getByLabelText(/lesson url/i), {
      target: { value: "https://example.com/lesson" }
    });

    fireEvent.click(screen.getByRole("button", { name: /add lesson/i }));

    await waitFor(() => {
      expect(createLesson).toHaveBeenCalledWith("abc123", "Intro to React", "https://example.com/lesson");
    });
  });

  it("loads lessons for the selected course from the lessons endpoint", async () => {
    vi.mocked(getMyCourses).mockResolvedValue({ myCourses: [{ courseId: "abc123", title: "React Basics", description: "Intro course" }] });
    vi.mocked(getLessonsByCourse).mockResolvedValue({
      lessons: [{ id: "lesson-1", title: "Intro to React", url: "https://example.com/lesson", orderIndex: 1 }]
    });

    render(
      <MemoryRouter initialEntries={[{ pathname: "/instructor/course/abc123/lessons", state: { course: { courseId: "abc123", title: "React Basics", description: "Intro course" } } }]}>
        <Routes>
          <Route path="/instructor/course/:courseId/lessons" element={<ManageLessons />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Intro to React")).toBeInTheDocument();
    expect(getLessonsByCourse).toHaveBeenCalledWith("abc123");
  });
});
