import Parser from "rss-parser";

type Article = Parser.Item;

interface ArticleListItem {
  item: Article;
}

interface CompanyNewsData {
  articleList: ArticleListItem[];
  description: string;
  image: string;
  link: string;
}

type ReturnCompanyNewsData = Record<string, CompanyNewsData>;

export const singleCompanyNewsParse = async (url: string): Promise<ReturnCompanyNewsData> => {
  const parser = new Parser();
  const feed = await parser.parseURL(url);

  const newsCompany = feed.title ?? "";
  const newsCompanyImage = feed.image?.url ?? "";
  const newsCompanyUrl = feed.link ?? "";
  const newsCompanyDescription = feed.description ?? "";

  const returnCompanyNewsData: ReturnCompanyNewsData = {};

  try {
    const articleList: ArticleListItem[] = [];

    // Guard against undefined items
    const items = Array.isArray(feed.items) ? feed.items : [];

    items.forEach((item) => {
      articleList.push({ item });
    });

    returnCompanyNewsData[newsCompany] = {
      articleList,
      description: newsCompanyDescription,
      image: newsCompanyImage,
      link: newsCompanyUrl,
    };

    return returnCompanyNewsData;
  } catch (error) {
    // Return empty object on failure but keep function return type stable
    // Log the error for debugging
    console.error("Failed to parse one or more feeds:", error);
    return returnCompanyNewsData;
  }
};
