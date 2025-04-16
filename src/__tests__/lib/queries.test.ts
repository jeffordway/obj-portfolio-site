import {
  getProjects,
  getProjectBySlug,
  getSkills,
  getAboutPageData,
  Project,
  Skill,
  AboutPageData,
} from "@/lib/sanity/queries";

jest.mock("@/lib/sanity", () => ({
  sanityFetch: jest.fn(),
}));

import { sanityFetch } from "@/lib/sanity";

import { mockConsole } from '../../testUtils/testUtils';

describe("queries.ts Sanity query functions", () => {
  mockConsole('error');

  describe("getProjects", () => {
    it("returns projects from sanityFetch", async () => {
      const projects: Project[] = [
        { _id: "1", title: "A", slug: { current: "a" } },
        { _id: "2", title: "B", slug: { current: "b" } },
      ];
      (sanityFetch as jest.Mock).mockResolvedValueOnce(projects);
      const result = await getProjects();
      expect(result).toEqual(projects);
      expect(sanityFetch).toHaveBeenCalled();
    });

    it("returns [] if sanityFetch throws", async () => {
      (sanityFetch as jest.Mock).mockRejectedValueOnce(new Error("fail"));
      const result = await getProjects();
      expect(result).toEqual([]);
    });
  });

  describe("getProjectBySlug", () => {
    it("returns a project if found", async () => {
      const project: Project = { _id: "1", title: "A", slug: { current: "a" } };
      (sanityFetch as jest.Mock).mockResolvedValueOnce(project);
      const result = await getProjectBySlug("a");
      expect(result).toEqual(project);
      expect(sanityFetch).toHaveBeenCalledWith(
        expect.objectContaining({ params: { slug: "a" } })
      );
    });

    it("returns null if sanityFetch throws", async () => {
      (sanityFetch as jest.Mock).mockRejectedValueOnce(new Error("fail"));
      const result = await getProjectBySlug("a");
      expect(result).toBeNull();
    });
  });

  describe("getSkills", () => {
    it("returns skills from sanityFetch", async () => {
      const skills: Skill[] = [
        { _id: "1", title: "React", category: { _id: "c1", title: "Frontend" } },
      ];
      (sanityFetch as jest.Mock).mockResolvedValueOnce(skills);
      const result = await getSkills();
      expect(result).toEqual(skills);
      expect(sanityFetch).toHaveBeenCalled();
    });

    it("returns [] if sanityFetch throws", async () => {
      (sanityFetch as jest.Mock).mockRejectedValueOnce(new Error("fail"));
      const result = await getSkills();
      expect(result).toEqual([]);
    });
  });

  describe("getAboutPageData", () => {
    it("returns about page data from sanityFetch", async () => {
      const about: AboutPageData = {
        _id: "a",
        title: "About",
        headline: "hi",
        aboutContent: [],
        bentoItems: [],
      };
      (sanityFetch as jest.Mock).mockResolvedValueOnce(about);
      const result = await getAboutPageData();
      expect(result).toEqual(about);
      expect(sanityFetch).toHaveBeenCalled();
    });

    it("returns null if sanityFetch throws", async () => {
      (sanityFetch as jest.Mock).mockRejectedValueOnce(new Error("fail"));
      const result = await getAboutPageData();
      expect(result).toBeNull();
    });
  });
});
