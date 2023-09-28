const Cookies = require("js-cookie");
const save_cookie = data =>  Cookies.set("cookies_cerveau", JSON.stringify(data), { expires: 1, path: '/'});

const get_cookie = cookie_name => Cookies.get(cookie_name)? JSON.parse(Cookies.get(cookie_name)): false;

const destrory = cle=>{
    Cookies.remove(cle);
    window.location.reload();
};

module.exports = {get_cookie, save_cookie, destrory};