let personName = document.getElementById("floatingInput"); //calling the id of the username
let personPass = document.getElementById("floatingPassword"); //calling the id for the password
let button = document.getElementsByClassName("arrow down"); //calling the the arrow class



personName.addEventListener("click", userName); //actionlisteners for the events when they occur
personPass.addEventListener("click", password);
button[0].addEventListener("click", arrowClicked);

//username and password are useless at the moment. Just here for furure references

function userName()
{
    let personName = document.getElementById("floatingInput");//Changes the background of the userName field to white
    personName.style.background = "#d8d1d1";
    personName.style.border = "black";
    
};

function password() //Changes the background of the password field to white
{
    let personName = document.getElementById("floatingPassword");
    personName.style.background = "d8d1d1";
    personName.style.border = "black";
};

function arrowClicked(){ //When arrow is clicked, this function is called the get started text and arrow disappear
    var contain = document.getElementsByClassName("container fade")[0].style.display = "block";
    button[0].style.display = "none";
    let header = document.getElementsByTagName("h1")[0].style.display = "none";

};