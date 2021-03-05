window.addEventListener("scroll", function(){
    if (document.documentElement.scrollTop > 50){
        document.querySelector("#mainNavbar").classList.add("scrolled")
    }
    else {
        document.querySelector("#mainNavbar").classList.remove("scrolled")
    }
})