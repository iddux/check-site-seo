export interface Analysis {
  isSSL: boolean;
  statusCode: number;
  siteRating: number;
  domElementsCount: number;
  p: number;
  headings: {
    h1: number,
    h2: number,
    h3: number,
    h4: number,
    h5: number,
    h6: number
  };
}
