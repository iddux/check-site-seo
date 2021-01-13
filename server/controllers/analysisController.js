const handleAsync = require('./../utils/handleAsync')
const {GeneralError} = require('./../utils/handleErrors');
const axios = require('axios');

const jsdom = require('jsdom');
const {JSDOM} = jsdom;

exports.makeAnalysis = handleAsync(async (req, res, next) => {
  try {
    const site = await axios.get(req.body.siteUrl);
    const data = site.data;
    const statusCode = site.request.res.statusCode;
    const isSSL = site.request.connection.authorized;

    const dom = new JSDOM(data, {
      resources: "usable",
    });

    const {document} = dom.window;

    const result = {
      isSSL,
      statusCode,
      siteRating: 0,
      domElementsCount: 0,
      p: 0,
      headings: {h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0,},
    }

    calculateResult(document, result);

    res.status((200)).json({
      'status': 'success',
      data: result,
    });

  } catch ($e) {
    throw new GeneralError('The page with the specified host does not exist');
  }
});

const calculateResult = (document, result) => {
  result.p = document.querySelectorAll('p').length;
  result.domElementsCount = document.querySelectorAll('*').length;

  calculateHeadingsCount(document, result)
  calculateSiteRating()
}

const calculateHeadingsCount = (document, result) => {
  for (const property in result.headings) {
    const headingDOM = document.querySelectorAll(`${property}`);

    if (headingDOM.length > 0) {
      result.headings[property] = headingDOM.length;
    }
  }
}

const calculateSiteRating = (document, result) => {
  // TODO make site rating algoritm (based on previous search)
}





