const ajaxPromise = param => {
    return new Promise((resolve, reject) => {
        const xml = new XMLHttpRequest();
        xml.open(param.type || "GET", param.url, true);
        xml.setRequestHeader("Content-type", "application/json");
        xml.send(param.data || null);

        xml.onreadystatechange = () => {
            if (xml.readyState === 4) {
                if (xml.status === 200) {
                    resolve(xml.response);
                } else {
                    reject(xml.response);
                }
            }
        }
    })
};

const checkLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user && user._id) return user._id;
    else return false;
}

module.exports = {
    ajax: ajaxPromise,
    checkLogin: checkLogin
}

