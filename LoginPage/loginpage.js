let inputname = ""
let inputemail = ""
let inputaddress = ""
let imgUrl = ""

let error = false
let error2 = false

document.querySelector("#name").addEventListener("input",(e)=>{
    document.querySelector(".error-name").classList.add("display")
    inputname = e.target.value
})

document.querySelector("#email").addEventListener("input",(e)=>{
    document.querySelector(".error-email").classList.add("display")
    inputemail = e.target.value
})

document.querySelector(".file-up").addEventListener("click",(e)=>{
    document.querySelector(".error-up").classList.add("display")
})

document.querySelector(".file-up").addEventListener("input",(e)=>{
    document.querySelector(".error-up").classList.add("display")
})

document.querySelector("#address").addEventListener("input",(e)=>{
    document.querySelector(".error-add").classList.add("display")
    inputaddress = e.target.value
})

document.querySelector(".button").addEventListener("click",async(e)=>{
    if(document.querySelector("#address").value === ""){
        error = true
        document.querySelector(".error-add").classList.remove("display")
        document.querySelector(".error-add").innerHTML = "*Enter the field value"
    }

    if(document.querySelector("#name").value === ""){
        error = true
        document.querySelector(".error-name").classList.remove("display")
        document.querySelector(".error-name").innerHTML = "*Enter the field value"
    }

    if(document.querySelector("#email").value === ""){
        error = true
        document.querySelector(".error-email").classList.remove("display")
        document.querySelector(".error-email").innerHTML = "*Enter the field value"
    }

    if(document.querySelector(".file-up").value === ""){
        error = true
        document.querySelector(".error-up").classList.remove("display")
        document.querySelector(".error-up").innerHTML = "*Upload the image file"
    }
    e.preventDefault()
    try{
        if(!error){
            await handleImage()
                const url = "https://backend-01-92mi.onrender.com/api/login";
                const data = {
                    name:inputname,
                    email:inputemail,
                    address:inputaddress,
                    img:imgUrl
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
                    window.location.assign("../ThankYou/thankyou.html");
                }
                })
                .catch(error => {
                console.error('Fetch error:', error);
                });
            }
        }
    catch(err){
        console.log(err)
    }
})

async function handleImage() {
    const fileInput = document.querySelector(".file-up");
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imgUrl = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        error = true;
        document.querySelector("error-up").classList.remove("display")
        document.querySelector("error-up").innerHTML = "*Upload the image file"
        console.error('No file selected');
    }
}
