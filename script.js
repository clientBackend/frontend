if(screen.width > 768){
  window.location.assign("../PageNotFound/PageNotFound.html")
}

document.querySelector(".button").addEventListener("click",(e)=>{
    e.preventDefault()
    window.location.assign("./Click/click.html")
})
