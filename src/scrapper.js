const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const getHtml = async (url) => {
    try {
        return await axios.get(url);
    } catch (err) {
        console.log(err);
    }
};
const getDomData = ($, page) => {
    let data = "";
    let flag = true;
    const prefix_link = "http://www.sogang.ac.kr";
    $("tbody")
        .find("tr")
        .each((_, node) => {
            let temp = $(node)
                .children()
                .text()
                .match(/([0-9]{4})\.([0-9]{2})\.([0-9]{2})/g);

            if (temp !== null) {
                temp = temp[temp.length - 1];
                if (page != 1 && temp.substr(0, 4) !== "2021") {
                    flag = false;
                }
                data +=
                    prefix_link +
                    $(node).find("div.subject > a").attr("href") +
                    " || " +
                    $(node).find("div.subject").text().trim() +
                    " || " +
                    temp +
                    "\n";
            }
        });
    return flag ? [true, data] : [false, data];
};

const save = async (url, filename) => {
    for (let page = 1; ; page++) {
        const html = await getHtml(url.replace("%d", page));
        const $ = cheerio.load(html.data);

        const data = getDomData($, page);

        if (fs.existsSync("./result_scrapping/" + filename)) {
            fs.appendFileSync(
                "./result_scrapping/" + filename,
                data[1],
                (err) => console.log(err)
            );
        } else {
            fs.writeFileSync("./result_scrapping/" + filename, data[1], (err) =>
                console.log(err)
            );
        }
        if (data[0] == false) {
            break;
        }
    }
};

const initiateFile = () => {
    if (fs.existsSync("./result_scrapping/scholarship.txt")) {
        try {
            fs.unlinkSync("./result_scrapping/scholarship.txt");
        } catch (err) {
            console.log(err);
        }
    }
    if (fs.existsSync("./result_scrapping/covid.txt")) {
        try {
            fs.unlinkSync("./result_scrapping/covid.txt");
        } catch (err) {
            console.log(err);
        }
    }
    if (fs.existsSync("./result_scrapping/student.txt")) {
        try {
            fs.unlinkSync("./result_scrapping/student.txt");
        } catch (err) {
            console.log(err);
        }
    }
    if (fs.existsSync("./result_scrapping/general.txt")) {
        try {
            fs.unlinkSync("./result_scrapping/general.txt");
        } catch (err) {
            console.log(err);
        }
    }
};

const covid = async () => {
    const url =
        "http://sogang.ac.kr/front/boardlist.do?currentPage=%d&menuGubun=1&siteGubun=1&bbsConfigFK=362&searchField=ALL&searchValue=&searchLowItem=ALL";

    save(url, "covid.txt");
};

const scholarship = async () => {
    const url =
        "http://sogang.ac.kr/front/boardlist.do?currentPage=%d&menuGubun=1&siteGubun=1&bbsConfigFK=141&searchField=ALL&searchValue=&searchLowItem=ALL";

    save(url, "scholarship.txt");
};

const general = async () => {
    const url =
        "http://sogang.ac.kr/front/boardlist.do?currentPage=%d&menuGubun=1&siteGubun=1&bbsConfigFK=1&searchField=ALL&searchValue=&searchLowItem=ALL";

    save(url, "general.txt");
};

const student = async () => {
    const url =
        "http://sogang.ac.kr/front/boardlist.do?currentPage=%d&menuGubun=1&siteGubun=1&bbsConfigFK=2&searchField=ALL&searchValue=&searchLowItem=ALL";

    save(url, "student.txt");
};

const main = () => {
    initiateFile();
    scholarship();
    covid();
    general();
    student();
};

main();
