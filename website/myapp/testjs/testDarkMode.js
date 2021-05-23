var setCookie = function (n, val) {
    var exdays = 30
    var d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    var expires = 'expires=' + d.toGMTString()
    document.cookie = n + '=' + val + '; ' + expires
}

var getCookie = function (n) {
    var name = n + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') c = c.substring(1)
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

document.onclick = function (e) {
    if (e.target.className == 'btn') {
        var favColor = e.target.style.backgroundColor
        if(favColor == 'rgb(26, 26, 26)'){
            var test = document.getElementsByClassName("text-center")[0].style.color = 'white'
            setCookie('textColor', test)
        }
        if(favColor == 'rgb(254, 253, 255)'){
            var test = document.getElementsByClassName("text-center")[0].style.color = 'black'
            setCookie('textColor', test)
    }
        setCookie('color', favColor)
        document.body.style.backgroundColor = favColor

        
    location.reload();
    return false;
    }

}

window.onload = function () {
    //Setting variables
    var favColor = document.body.style.backgroundColor
    var textColor = document.getElementsByClassName("text-center")[0].style.color 
    
    //getCookie
    var color = getCookie('color')
    var textColor = getCookie('textColor')
    
    if (color === 'rgb(254, 253, 255)') {
        
        var doc = document.getElementsByClassName('navbar navbar-expand-lg navbar-light bg-light')[0]
        doc.className = doc.className.replace('navbar navbar-expand-lg navbar-dark bg-dark', 'navbar navbar-expand-lg navbar-light bg-light')

        document.body.style.backgroundColor = favColor
        document.getElementsByClassName("text-center")[0].style.color = textColor
        
    } 
    
    if(color === 'rgb(26, 26, 26)')
     {
         
        var doc = document.getElementsByClassName('navbar navbar-expand-lg navbar-light bg-light')[0]
        doc.className = doc.className.replace('navbar navbar-expand-lg navbar-light bg-light', 'navbar navbar-expand-lg navbar-dark bg-dark')
        
        document.body.style.backgroundColor = color
        document.getElementsByClassName("text-center")[0].style.color = textColor

        
    }


}
