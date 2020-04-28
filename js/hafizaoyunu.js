const cards = document.querySelectorAll('.memory-card');
var saniye;
var dakika;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var saatKontrol =1; 
var saniyeSayaci=0;; 
var tStart  = null;
var denemeSayisi =0; 
var eslesenSayisi =0;



function Start()                                                          
{                                                                       
   tStart   = new Date();   document.theTimer.theTime.value = "00:00";   
   timerID  = setTimeout("UpdateTimer()", 1000);                        

}                                                                                  

function Stop()
{
   if(timerID)
    {   
        oyunBitimiGecenTumSaniye = timerID; 
        clearTimeout(timerID);      
        timerID  = 0;
        document.getElementById("gecenSaniye").innerHTML = "Süre = "  + tDate.getMinutes() + " Dakika " + tDate.getSeconds()+ " Saniye";
    }
   tStart = null;
}



function denemeSayisiniEkranaBas()
{
    denemeSayisi++;
    document.getElementById("tiklama").innerHTML = "Deneme Sayısı = " + denemeSayisi;
}

function eslesenSayisiniEkranaBas()
{
    eslesenSayisi++;
    document.getElementById("eslesen").innerHTML = "Eslesen Sayısı = " + eslesenSayisi;

    if(eslesenSayisi==6)
    {
        setTimeout(oyunBitti, 500);
        Stop();
    }
}

function oyunBitti() {
    alert("Tebrikler ! "+" "+dakika+" dk"+" "+saniye+" sn içerisinde tamamladınız. ");
}


function flipCard()
{                       // kart çevirme işlemleri
    if(saatKontrol==1)      
    {                
        Start();            
        saatKontrol=0;    
    }                      
    if (lockBoard) 
    {
         return;

    }   
    if (this === firstCard)
    {

        return;

        denemeSayisiniEkranaBas();
    }



    this.classList.add('flip');


    if (!hasFlippedCard)
    {

        hasFlippedCard = true;

        firstCard = this;

        return;

    }

    secondCard = this;
  
    checkForMatch();
    
}

function unflipCards() // doğru eşleşmeyen olursa ters çevir
{ 

    lockBoard = true;

    setTimeout(() => {
                        firstCard.classList.remove('flip');
                        secondCard.classList.remove('flip');
                        resetBoard();
                     }, 1000);
    denemeSayisiniEkranaBas();
}

function checkForMatch()
{

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if(isMatch)
        {

            disableCards();

        }
    if(!isMatch)
    {

        unflipCards();

    }  

}

function disableCards()
{ 

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    denemeSayisiniEkranaBas();
    eslesenSayisiniEkranaBas();
    resetBoard();
}



function resetBoard()
{ 

    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    $(".clock").text(simdikiZaman); 
}

(function shuffle()
{

    cards.forEach(card => {
                            let randomPos = Math.floor(Math.random() * 12);
                            card.style.order = randomPos;
                          });
})();


function UpdateTimer()
{   if(timerID)
    {
      clearTimeout(timerID);
      clockID  = 0;
    }  if(!tStart)
      tStart   = new Date();
      var   tDate = new Date();
      var   tDiff = tDate.getTime() - tStart.getTime();
      tDate.setTime(tDiff);
      document.theTimer.theTime.value = "" + tDate.getMinutes() + ":" + tDate.getSeconds();
      document.getElementById("gecenSaniye").innerHTML = "Süre = "  + tDate.getMinutes() + " Dakika " + tDate.getSeconds()+ " Saniye";
    saniye = tDate.getSeconds();
    dakika = tDate.getMinutes();
      timerID = setTimeout("UpdateTimer()", 1000);}

   




   function Reset() {   tStart = null;
   document.theTimer.theTime.value = "00:00";}//-->

cards.forEach(card => card.addEventListener('click', flipCard));
Stop();