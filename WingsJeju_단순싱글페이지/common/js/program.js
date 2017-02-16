function phoneFormat(el)
{
    var str = el.value;
    
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if( str.length < 4)
    {
        el.value = str;
    }else if(str.length < 7)
    {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        el.value = tmp;
    }else if(str.length < 11)
    {
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 3);
        tmp += '-';
        tmp += str.substr(6);
        el.value = tmp;
    }else
    {				
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7);
        el.value = tmp;
    }
}

//layer
function layerClose()
{
    //$('#resultPop').hide();
    $("#resultPop").html('');
    $("#resultPop").removeClass("open");
}

function changelayer(target)
{
    $("#resultPop").html('');
    jQuery.ajax({
        url: target,
        type: "post",
        success: function (result) {
            $("#resultPop").html(result);
            $("#resultPop").find("script").each(function (i) {
                eval($(this).text());
            });
        },
        error: function (result) {
            alert("Error");
        }
    });
}

function initLayer(target) { //팝업열기버튼 온클릭으로 호출
    $("#resultPop").html('');
    jQuery.ajax({
        url: target,
        type: "post",
        success: function (result) {
            $("#resultPop").html(result);
            $("#resultPop").addClass("open");
            $("#resultPop").find("script").each(function (i) {
                eval($(this).text());
            });
        },
        error: function (result) {
            alert("Error");
        }
    });
    return false;
};