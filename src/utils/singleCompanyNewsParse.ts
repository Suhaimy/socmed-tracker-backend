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

export const singleCompanyNewsParse = async (url: string) => {
  const parser = new Parser();
  const feed = await parser.parseURL(url);
  const newsCompany = feed.title ?? "";
  const newsCompanyImage = feed.image?.url ?? "";
  const newsCompanyUrl = feed.link ?? "";
  const newsCompanyDescription = feed.description ?? "";

  try {
    const returnCompanyNewsData: ReturnCompanyNewsData = {};
    const articleList: ArticleListItem[] = [];

    feed.items.forEach((item) => {
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
    console.error("Failed to parse one or more feeds:", error);
  }
};
