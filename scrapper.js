// 장학
//  'http://sogang.ac.kr/front/boardlist.do?currentPage=%d&menuGubun=1&siteGubun=1&bbsConfigFK=141&searchField=ALL&searchValue=&searchLowItem=ALL'

// 일반
// 'http://sogang.ac.kr/front/boardlist.do?currentPage=%d&menuGubun=1&siteGubun=1&bbsConfigFK=1&searchField=ALL&searchValue=&searchLowItem=ALL'

// 학사
// 'http://sogang.ac.kr/front/boardlist.do?currentPage=%d&menuGubun=1&siteGubun=1&bbsConfigFK=2&searchField=ALL&searchValue=&searchLowItem=ALL'

// 코로나
// 'http://sogang.ac.kr/front/boardlist.do?currentPage=%d&menuGubun=1&siteGubun=1&bbsConfigFK=362&searchField=ALL&searchValue=&searchLowItem=ALL'

const axios = require("axios");

const getHtml = async () => {
    try {
        return await axios.get(
            "http://sogang.ac.kr/front/boardlist.do?currentPage=%d&menuGubun=1&siteGubun=1&bbsConfigFK=141&searchField=ALL&searchValue=&searchLowItem=ALL"
        );
    } catch (err) {
        console.log(err);
    }
};
const scraping = async () => {
    const html = await getHtml();
    // console.log(html);
    // '/"\/front\/boardview([^"]+)"/';
    const reg = new RegExp('/"/front/boardview([^"]+)"/g');
    console.log(html.toString().matchAll(reg));
    // console.log(typeof html.toString());
};

scraping();
