function jsf__pay()
{
  var val = document.getElementById("req_data").value;
  if(val.length < 2400) {
    alert("요청데이터를 확인해주세요")
  } else {
    window.dim.style.display = 'inline';
    setTimeout(function () {
      document.location.href = ( url + params );
    }, 2500);
    location.href = "./support/pay/step4"
  }
}

function mobile__pay()
{
    window.dim.style.display = 'inline';
    setTimeout(function () {
      document.location.href = ( url + params );
    }, 2500);
    location.href = "./support/pay/mob1"
}

function textCopy(btnID)
{
  const copyBtn = document.getElementById(btnID);
  const textElement = document.getElementById(btnID.replace('-btn', ''));
  let text;
  if (textElement.tagName === 'TEXTAREA' || textElement.tagName === 'INPUT') {
    text = textElement.value;
  } else {
    text = textElement.textContent;
  }
  if (text) {
    navigator.clipboard.writeText(text)
    // 성공인 경우
    copyBtn.classList.add( 'copied' );
    var temp = setInterval( function(){
      copyBtn.classList.remove( 'copied' );
      clearInterval(temp);
    }, 1000 );
  }
}

function makeSigndata()
{
  document.getElementById("t4-textarea").value = "VORz3S12+lnSitNH4SC+aY/T23PRbI7Gd8gO4tMmi0qQX2by0LQp2G2GO0v19++CIz8K/804CIxozqQSaYOYXg5xp5RQH3+IQNL7mFS2vLOVk2MnXu2MuB0XRVXqUuLo079Ufo5y3isKkm5sIF3pOASWnUT7ZvA8RlSycnwL1S0sf4Wvb6n2dKJ2cgasEP4Xl4nvinWC+NzaeXaQtWZRMVX8l7BiGYb2Gr0OK2ZpMfab/LS6R86fyUm2iw8iayIpe7XJaDNGWKHkUFraEjPfJU08Q98AEDWL2acrhD9D60lOZQIqdPaOIAk7vkKQlzohjLlekaR+UrJs2xIysRWnXA==";
}

function makeCanceldata()
{
  document.getElementById("t7-textarea").value = "{\"res_cd\":\"T0000\", \"res_msg\":\"정상처리\"}";
}
