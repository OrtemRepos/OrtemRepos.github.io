function radioChoise(type) {
    let x = ["date", "phone", "url_link", "email"]
    for (i=0; i < x.length; i++)
    {
        if (x[i] == type)
        {
            document.getElementById(x[i]).hidden = false
            document.getElementById(x[i]+"_label").hidden = false
            document.getElementById(x[i]).required = true
        }
        else
        {
            document.getElementById(x[i]).hidden = true
            document.getElementById(x[i]+"_label").hidden = true
            document.getElementById(x[i]).required = false
        }
    }
}
function showCheckbox() {
    document.getElementById("checkbox").hidden = false
}
function hideCheckbox() {
    document.getElementById("checkbox").hidden = true
}
function changeList() {
    let a = document.getElementById("list").value
    if (a == "study")
    {
        showCheckbox()
    }
    else
    {
        hideCheckbox()
    }
}
function dateF() {
    const a = new Date();
    document.getElementById("date").min = `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
    document.getElementById("date").max = `${a.getFullYear() + 1}-${a.getMonth() + 1}-${a.getDate()}`
    
}
document.addEventListener("DOMContentLoaded", dateF);