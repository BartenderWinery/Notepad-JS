var doc=document.body.children[1].children[1]
var p=document.body.children[2]
var cmd={
    toggle:function(){
        if(p.style.display!="flex"){
            p.style.display="flex"
            p.children[0].focus()
        }else{
            p.style.display="none"
            doc.focus()}}}