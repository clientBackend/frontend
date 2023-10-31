document.querySelector(".button").addEventListener("click",(e)=>{
    e.preventDefault()
    if(document.querySelector(".form-check-input").checked === true){
        window.location.assign("./Click/click.html")
    }
})