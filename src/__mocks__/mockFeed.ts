// Use the types from rss-parser to ensure consistency
import Parser from "rss-parser";

type Article = Parser.Item;
type ParsedFeed = Parser.Output<Article>;

// Define a simple, static mock item
const mockFeedItem: Article = {
  link: "http://mock.com/article1",
  pubDate: new Date().toISOString(),
  title: "Mock Article Title",
  // rss-parser might add other fields like guid, categories, etc.
};

// Define the full mock feed structure
const mockFeed: ParsedFeed = {
  description: "A description of the mock company.",
  image: {
    link: "http://mock.com",
    title: "Mock Image", // Added required properties from the default Parser.Image type
    url: "http://mock.com/logo.png",
  },
  items: [mockFeedItem, { ...mockFeedItem, title: "Another Mock Article" }],
  link: "http://mock.com",
  title: "Mock News Company",
};

export default mockFeed;
