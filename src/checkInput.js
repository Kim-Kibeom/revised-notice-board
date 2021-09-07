function check() {
    // var formData = $("#myform").serialize();
    const isChecked = document.getElementsByName("ckb");
    const theForm = document.frm;
    let flag = false;

    if (theForm.input.value == "") {
        alert("키워드를 입력하세요.");
        return;
    }

    for (let i = 0; i < isChecked.length; i++) {
        if (isChecked[i].checked) {
            flag = true;
            break;
        }
    }
    if (!flag) {
        alert("원하는 공지사항을 체크하세요.");
        return;
    }
}
