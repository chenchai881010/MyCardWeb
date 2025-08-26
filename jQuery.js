  const currentUrl = window.location.href;
  new QRCode(document.getElementById("code"),{
    text:currentUrl,
    width:200,
    heihgt:200
  });
  var imgindex = 0;
  playIMG();
  function playIMG(){
    let images =$(".artIMG");
    let shows = $(".nowShow");
    $(shows[imgindex-1]).hide();
    $(images[imgindex-1]).removeClass('whiteBorder');
    if(imgindex >= images.length){imgindex = 0;}
    $(images[imgindex]).addClass('whiteBorder'); 
    $(shows[imgindex]).slideDown("slow");
    imgindex++;
    setTimeout(playIMG, 5000);
  }
  let thinking ="";
  let introduction ="";
  function putData(findname) {
    $.getJSON('Works.json',function(data){
      let target = findname;
      let findData =null;
      if($(".Position span").text()=="Unity工程師")
      {
        $.each(data[0]["Unity工程師"],function(index,item) {
          if(item.name == target)
            {
              findData = item;
              return false;
            }
        });
      }else{
        $.each(data[0]["前端工程師"],function(index,item) {
          if(item.name == target)
            {
              findData = item;
              return false;
            }
        });
      }
      if (findData) {
       //介紹
        $(".int_text div").html(findData.introduction);
        introduction = findData.introduction;
        //切圖
        let shows = $(".nowShow");
        let seles =$(".artIMG");
        $.each(shows,function(index,item){
          $(item).attr("src",findData.Image[index]);
        }); 
        $.each(seles,function(index,item){
          $(item).attr("src",findData.Image[index]);
        });   
        thinking = findData.thinking;     

      }else
      {
        alert("出錯了!抱歉暫時未上傳資料!")
      }
    });
      $(".int_text i").text("創作心得");
  }
  let ch_boolen = false;
$(function(){
  $(".ch_point i").on("click",function(){
    $(".front").toggleClass("frontFlip");
    $(".back").toggleClass("backFlip");
    $(".int_text").slideToggle();
    ch_boolen = !ch_boolen;
    if(ch_boolen){
    //設定預設作品
     $.getJSON('Works.json',function(data){
      let sele_list = "";
      if($(".Position span").text()=="Unity工程師"){
        $(".nowWork").text(data[0]["Unity工程師"][0].name);
        for (let i = 0; i < data[0]["Unity工程師"].length; i++) {
          sele_list = sele_list+"<p>"+data[0]["Unity工程師"][i].name+"</p>"
        }
      }else
      {
        $(".nowWork").text(data[0]["前端工程師"][0].name);
        for (let i = 0; i < data[0]["前端工程師"].length; i++) {
          sele_list = sele_list+"<p>"+data[0]["前端工程師"][i].name+"</p>"
        }
      }
      $(".dropdown").html(sele_list);
      putData($(".nowWork").text());
      });
    }
  });
  $(".QRcode").on("click",function() {
    $("#dialog").slideDown();
  });
  $("#dialog").on("click",function() {
    $("#dialog").slideUp();
  });
  $(".Position span").on("click",function(){
    if ( $(".Position span").text()=="Unity工程師") {
      $(".Position span").text("前端工程師");
      $("#telent").text("Html。CSS。JavaScript。JQuery。Bootstrap。P5.js。MySQL。");
    }else
    {
      $(".Position span").text("Unity工程師");
      $("#telent").text("Unity。C#。C++。VR/AR。");
    }
  });
  $(".Name").on("click",function() {
    $("#Introdution").fadeIn("slow");
  });
  $("#Introdution").on("click",function() {
    $("#Introdution").fadeOut("slow");
  });
  $(".workname").on("click",function(){
    $(".dropdown").slideToggle("slow");
  });
  $(".dropdown").on("click","p",function(){
    let push = $(this).text();
    $(".nowWork").text(push);
    putData(push);
  });
  $(".artIMG").on("click",function(){
    let shows = $(".nowShow");
    let seles =$(".artIMG");
    let m_alt =$(this).attr("alt");
    seles.removeClass('whiteBorder');
    imgindex = m_alt;
    shows.hide();
    $(shows[imgindex]).fadeIn("slow");
    $(this).addClass('whiteBorder');
  });
  $(".int_text i").on("click",function(){
    if ($(".int_text i").text()=="創作心得") {
       $(".int_text i").text("創作簡介");
      $(".int_text div").html(thinking);

    }else
    {
      $(".int_text i").text("創作心得");
      $(".int_text div").html(introduction);
    }
  });
});