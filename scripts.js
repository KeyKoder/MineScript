$(document).ready(function(){
    setInterval(highlight,1);

    $("#highlight").click(function(){
        $("#code").focus();
    })

    $("#code").keydown(function(){
        $("#highlight").text($(this).val());
    })
    $("#code").keyup(function(){
        $("#highlight").text($(this).val());
    })
})

function highlight(){
    let codeElements = $("code");
    let primaryKeyReg=/\b(let|new)(?=[^\w])/g;
    let functionReg=/\b(FloorCrafting|as|at)(?=[^\w])/g;
    let classesReg=/\b(Item|Selector)(?=[^\w])/g;
    let htmlReg=/(<[^\&]*>)/g;
    let ltReg=/</g;
    let gtReg=/>/g;
    let stringReg=/((?<![\\])['"])((?:.(?!(?<![\\])\1))*.?)\1/g; //From: https://www.metaltoad.com/blog/regex-quoted-string-escapable-quotes
    // let stringRegSingle=/'(.*?)'/g;
    let commentReg=/(\/\/.*)/g
    codeElements.each(function(){
        var string = $(this).text();
        var parsed = string.replace(ltReg,'&lt;');
        parsed = parsed.replace(gtReg,'&gt;');
        parsed = parsed.replace(htmlReg,'<pre>$1</pre>');
        parsed = parsed.replace(stringReg,'<span class="string">$1$2$1</span>');
        // parsed = parsed.replace(stringRegSingle,'<span class="string">\'$1\'</span>');
        parsed = parsed.replace(primaryKeyReg,'<span class="primary">$1</span>');
        parsed = parsed.replace(functionReg,'<span class="function">$1</span>');
        parsed = parsed.replace(classesReg,'<span class="class">$1</span>');
        parsed = parsed.replace(commentReg,'<span class="comment">$1</span>');
        $(this).html(parsed)
    })
}