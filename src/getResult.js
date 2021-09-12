const search = async (searchWord, filename) => {
    const filepath = "../result_scrapping/" + filename;
    const raw = await fetch(filepath);
    const response = await raw.text();

    const res = response.split("\n").filter((el) => {
        if (el.split(" || ").length === 3) {
            if (el.split(" || ")[1].indexOf(searchWord) != -1) {
                return el;
            }
        }
    });
    // console.log(res);
    return res;
};

const convertToHtml = (el, target) => {
    if (el === "no") {
        return `<tr><td><center> ${target} </center></td><td> 검색 결과가 없습니다. </td> <td> `;
    } else {
        return `<tr><td><center> ${target} </center></td><td>
        <a href=${el.split(" || ")[0]} target="_blank">${el.split(" || ")[1]}<a>
        </td><td>${el.split(" || ")[2]}</td></tr>`;
    }
};

const searchCovid = async (searchWord) => {
    const tbody = document.getElementsByTagName("tbody");
    const res = await search(searchWord, "covid.txt");
    if (res.length == 0) {
        tbody[0].innerHTML += convertToHtml("no", "코로나");
    }
    res.forEach((el) => {
        tbody[0].innerHTML += convertToHtml(el, "코로나");
    });
};
const searchGeneral = async (searchWord) => {
    const tbody = document.getElementsByTagName("tbody");
    const res = await search(searchWord, "general.txt");
    if (res.length == 0) {
        tbody[0].innerHTML += convertToHtml("no", "일반");
    }
    res.forEach((el) => {
        tbody[0].innerHTML += convertToHtml(el, "일반");
    });
};
const searchScholarship = async (searchWord) => {
    const tbody = document.getElementsByTagName("tbody");
    const res = await search(searchWord, "scholarship.txt");
    if (res.length == 0) {
        tbody[0].innerHTML += convertToHtml("no", "장학");
    }
    res.forEach((el) => {
        tbody[0].innerHTML += convertToHtml(el, "장학");
    });
};
const searchStudent = async (searchWord) => {
    const tbody = document.getElementsByTagName("tbody");
    const res = await search(searchWord, "student.txt");
    if (res.length == 0) {
        tbody[0].innerHTML += convertToHtml("no", "학사");
    }
    res.forEach((el) => {
        tbody[0].innerHTML += convertToHtml(el, "학사");
    });
};

const getResult = (boards, searchWord) => {
    const func = [searchScholarship, searchGeneral, searchStudent, searchCovid];
    const tbody = document.getElementsByTagName("tbody");
    tbody[0].innerHTML = "";
    boards.filter((el, index) => {
        if (el) {
            func[index](searchWord);
        }
    });
};
