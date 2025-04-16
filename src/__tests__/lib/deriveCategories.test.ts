import { deriveCategories } from "@/lib/utils/deriveCategories";
import type { Skill, Category } from "@/lib/sanity/queries";

describe("deriveCategories", () => {
  it("returns an empty array if skills is empty", () => {
    expect(deriveCategories([])).toEqual([]);
    expect(deriveCategories(undefined as any)).toEqual([]);
    expect(deriveCategories(null as any)).toEqual([]);
  });

  it("returns a single category for one skill", () => {
    const skills: Skill[] = [
      {
        _id: "s1",
        title: "React",
        category: { _id: "c1", title: "Frontend" },
      } as Skill,
    ];
    expect(deriveCategories(skills)).toEqual([
      { _id: "c1", title: "Frontend" },
    ]);
  });

  it("deduplicates categories by _id and sorts by title", () => {
    const skills: Skill[] = [
      {
        _id: "s1",
        title: "React",
        category: { _id: "c2", title: "Backend" },
      } as Skill,
      {
        _id: "s2",
        title: "Node.js",
        category: { _id: "c2", title: "Backend" },
      } as Skill,
      {
        _id: "s3",
        title: "CSS",
        category: { _id: "c1", title: "Frontend" },
      } as Skill,
    ];
    expect(deriveCategories(skills)).toEqual([
      { _id: "c2", title: "Backend" },
      { _id: "c1", title: "Frontend" },
    ].sort((a, b) => a.title.localeCompare(b.title)));
  });

  it("preserves optional fields (description, slug) if present", () => {
    const skills: Skill[] = [
      {
        _id: "s1",
        title: "React",
        category: {
          _id: "c1",
          title: "Frontend",
          description: "UI work",
          slug: { current: "frontend" },
        },
      } as Skill,
    ];
    expect(deriveCategories(skills)).toEqual([
      {
        _id: "c1",
        title: "Frontend",
        description: "UI work",
        slug: { current: "frontend" },
      },
    ]);
  });

  it("skips skills with missing or malformed category", () => {
    const skills: Skill[] = [
      {
        _id: "s1",
        title: "React",
        category: undefined,
      } as any,
      {
        _id: "s2",
        title: "Node.js",
        category: null,
      } as any,
      {
        _id: "s3",
        title: "CSS",
        category: { _id: "c1", title: "Frontend" },
      } as Skill,
    ];
    expect(deriveCategories(skills)).toEqual([
      { _id: "c1", title: "Frontend" },
    ]);
  });
});
