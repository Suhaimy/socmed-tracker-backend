import { singleCompanyNewsParse } from "#utils/singleCompanyNewsParse.js";
import { afterEach, describe, expect, it, vi } from "vitest";

// Minimal mock feed used by the test (keeps test self-contained and avoids
// importing from the __mocks__ directory which some lint rules discourage).
const mockFeed = {
  description: "A description of the mock company.",
  image: { url: "http://mock.com/logo.png" },
  items: [{ title: "Mock Article Title" }, { title: "Another Mock Article" }],
  link: "http://mock.com",
  title: "Mock News Company",
} as const;

// Mock the rss-parser module so Parser.parseURL returns our mockFeed
vi.mock("rss-parser", () => {
  return {
    default: function Parser() {
      return {
        parseURL: () => Promise.resolve(mockFeed),
      };
    },
  };
});

describe("singleCompanyNewsParse", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("parses mock feed into expected shape", async () => {
    const result = await singleCompanyNewsParse("http://mock");

    expect(result).toBeDefined();
    expect(result).toHaveProperty(mockFeed.title as string);

    const companyData = result[mockFeed.title as keyof typeof result];
    expect(companyData).toBeDefined();
    expect(companyData.description).toBe(mockFeed.description);
    expect(companyData.image).toBe(mockFeed.image.url);
    expect(companyData.link).toBe(mockFeed.link);
    expect(companyData.articleList).toHaveLength(mockFeed.items.length);
    expect(companyData.articleList[0].item.title).toBe(mockFeed.items[0].title);
  });
});
