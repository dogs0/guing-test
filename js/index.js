const path="./psgindex.js";
var content=undefined;
await import(path)
    .then((module) => {
        content=module.content;
    })
console.log(content);
const body = document.body;
var passages=[];
const langsel_init = (langs) => {
    langs.forEach((v) => {
        var sel = document.getElementById("language-select");
        var opt=document.createElement("option");
        opt.value=v[0];
        opt.textContent=v[1];
        sel.appendChild(opt);
        sel.onchange=langChange;
        sel.selectedIndex=0;
    });
}
const setvals = (ele,val) => {
        if (typeof val == "string")
            ele.textContent=val;
        else if (typeof val == "object")
        {
            val.forEach((v) => {
                if (typeof v == "string")
                    ele.appendChild(
                    document.createTextNode(v)
                    );
                else if (typeof v == "object"){
                    var el=document.createElement(v[0]);
                    setvals(el,v[1]);
                    v[2].forEach((v) => {
                        var attr=v[0];
                        var val=v[1];
                        el.setAttribute(attr,val);
                    });
                    ele.appendChild(el);
                }
            });
        }
    }
const loader = () => {
    var langs=content[1];
    langsel_init(langs);
    var lang=langs[0][0];
    var struct=content[0];
    var texts=content[2][lang];
    struct.forEach((v,i)=>{
        var ele;
        var spt="N";
        var val;
        if (/^[A-Z]/.test(v))
        ele=document.createElement(v.slice(1)),
        spt=v[0];
        else
        ele=document.createElement(v);
        val=texts[i];
        setvals(ele,val);
        passages.push(ele);
        switch(spt){
            case "N":
                body.appendChild(ele);
                break;
            case "H":
                body.insertBefore(ele,body.firstChild);
                break;
        }
    });
}
const langChange = () => {
    const sel=document.getElementById("language-select");
    const lang=sel.selectedOptions[0].value;
    var texts=content[2][lang];
    texts.forEach((v,i) => {
        var ele=passages[i];
        while (ele.firstChild) ele.firstChild.remove();
        setvals(ele,v);
    });
}
modules["langChange"]=langChange;
modules["loader"]=loader;
loader();