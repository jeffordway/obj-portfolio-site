import { client, sanityFetch } from "@/lib/sanity";

import { mockConsole } from '../../testUtils/testUtils';

describe("sanity.ts", () => {
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    // Patch client.fetch to a jest mock function for each test
    (client.fetch as unknown as jest.Mock) = jest.fn();
  });

  afterAll(() => {
    // Restore original NODE_ENV
    Object.defineProperty(process.env, "NODE_ENV", {
      value: originalNodeEnv,
      writable: true,
    });
  });
  // Optionally suppress error output in error tests:
  // mockConsole('error');

  describe("sanityFetch", () => {
    it("calls client.fetch with correct arguments (dev mode)", async () => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "development",
        writable: true,
      });
      (client.fetch as jest.Mock).mockResolvedValueOnce("result");
      const result = await sanityFetch({ query: "*[]", params: { foo: 1 }, tags: ["tag1"] });
      expect(client.fetch).toHaveBeenCalledWith(
        "*[]",
        { foo: 1 },
        { cache: "no-store", next: { revalidate: 0 } }
      );
      expect(result).toBe("result");
    });

    it("calls client.fetch with correct arguments (prod mode)", async () => {
      Object.defineProperty(process.env, "NODE_ENV", {
        value: "production",
        writable: true,
      });
      (client.fetch as jest.Mock).mockResolvedValueOnce("result");
      const result = await sanityFetch({ query: "*[]", params: undefined, tags: ["tag1", "tag2"] });
      expect(client.fetch).toHaveBeenCalledWith(
        "*[]",
        {},
        { cache: "force-cache", next: { tags: ["tag1", "tag2"] } }
      );
      expect(result).toBe("result");
    });

    it("defaults params and tags if not provided", async () => {
      (client.fetch as jest.Mock).mockResolvedValueOnce("ok");
      await sanityFetch({ query: "*[]" });
      expect(client.fetch).toHaveBeenCalledWith(
        "*[]",
        {},
        expect.any(Object)
      );
    });
  });
});
