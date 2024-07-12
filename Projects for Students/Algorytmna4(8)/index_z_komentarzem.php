<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Projekt</title>
    <style>
        form{
            margin-top: 50px;
            margin-left: 20px;
            margin-right: 20px;
            float: left;
            text-align:center;
            width: 273px;
            border: 1px solid lightblue;
        }
        .typ1{
            text-align:center;
            font-size: 200%;
            background-color: red;

            width: 60px;
            height: 60px;
            float: left;
        }
        .typ2{
            text-align:center;
            font-size: 200%;
            background-color: blue;

            width: 60px;
            height: 60px;
            float: left;
        }
        #klik{
            font-size: 50px;
            width: 250px;
        }
        #wynik{
            margin:0px;
            margin-top:250px;
            float:left;
            text-align:center;
            font-size: 200px;
        }
    </style>
</head>
<body>
    <form action="index_z_komentarzem.php" method="post"><!--FORMULARZ po kliknięciu przycisku submit wartośći inputów(value) wysyłane są do tablicy POST o indexach nazw(name) inputów-->
                                                            <!--dodatkowo form wysyłyła te dane do strony 'index_z_komentarzem.php' czyli do tej samej strony, więc te wartości są na tej samej stronie-->
        <?php
        //#####################
        //podpunkt a. POCZATTEK
        //#####################
            for($i=1;$i<11;$i++){//pętla określająca numer wiersza od 1 do 10. Pętla ta buduję całą początkową tabelkę kostek.
                echo "<input type='numeric' name='w".$i."k1' class='typ1' value=1>";// tutaj dla przykładu jest to wartość 1 o indexie w$ik1 gdzie $i jest liczbą wiersza czyli od 1 do 10 czyli dla 1 wiersza w1k1
                echo "<input type='numeric' name='w".$i."k2' class='typ1' value=1>";
                echo "<input type='numeric' name='w".$i."k3' class='typ2' value=2>";
                echo "<input type='numeric' name='w".$i."k4' class='typ2' value=2>";
            }
        //##################
        //podpunkt a. KONIEC
        //##################
        ?>
        <input type="submit" value="Prześlij" style="width: 200px; height: 50px; font-size: 150%;"><!--Przycisk submit wysyłające wcześniej wspomniane dane do tablicy php POST-->
    </form>
    <p id="wynik">&#8594;</p>
    <form>
        <?php
        // to jest form w której będziemy losować komórki i wpisywać je do nowego forma 
            if(!empty($_POST["w1k1"])){//to powoduje, że zamiast błędu wypisujemy komunikat o kliknięciu przycisku

                //####################
                //podpunkt b. POCZATEK
                //####################

                for($i=1;$i<11;$i++){//pętla określająca wiersze <1;10>

                    //####################
                    //podpunkt d. POCZATEK
                    //####################

                    for($dwa=0;$dwa<2;$dwa++){//pętla spełniająca podpunkt d czyli wszystko dwukrotnie

                    //##################
                    //podpunkt d. KONIEC
                    //##################

                        for($kol=1;$kol<5;$kol++){//pętla określająca numer komórki <1;4>

                            $rand = (rand(1,4));//funkcja języka php losująca liczbę od 1 do 4

                            if($_POST["w".$i."k".$kol]==1){//jeśli w TABLICY POST o indexie np w1k1(czyli pierwsza komórka) jest vartość 1, to
                                if($_POST["w".$i."k".$rand]==2){//jeśli w wylosowanym indexie w tym damym wierszu np w1k3 jest inna liczba czyli 2,to:
    
                                    $_POST["w".$i."k".$kol]=2;//zamieniamy wartość komórki np pierwszej na 2 bo gdyby wylosowa komórka miałaby wartość 1 to zamiana nie miałaby sensu
                                    $_POST["w".$i."k".$rand]=1;//a tutaj analogicznie zamieniamy tylko wartością komórki np w1k1 czyli 1. 
                                    //W następnych if'ach jest dokładnie to samo, tylko rozpatrujemy inny przypadek kiedy to komórka np w1k1 ma wartość 2 a losowana wartość wartość ma inną wartość
    
                                }
                            }
                            else if($_POST["w".$i."k".$kol]==2){
                                if($_POST["w".$i."k".$rand]==1){
    
                                    $_POST["w".$i."k".$kol]=1;
                                    $_POST["w".$i."k".$rand]=2;
                                    
                                }
                            }
                        }

                    }

                    //##################
                    //podpunkt b. KONIEC
                    //##################
                    
                    //####################
                    //podpunkt c. POCZATEK
                    //####################

                    for($wpisz=1;$wpisz<5;$wpisz++){//pętla, która ma za zadanie wpisanie nowych wartości do forma
                        if($_POST["w".$i."k".$wpisz]==1){//musimy rozpatrzeć dwa przypadki aby prawidłowo przypisać klasę obiektu. Czyli kiedy wartość 1 to klasa to typ1
                            echo "<input type='numeric' class='typ1' value=".$_POST["w".$i."k".$wpisz].">";//value inputa musi być określone poprzez tablicę POST z nowymi wartościami
                        }
                        else if($_POST["w".$i."k".$wpisz]==2){
                            echo "<input type='numeric' class='typ2' value=".$_POST["w".$i."k".$wpisz].">";
                        }
                    }

                    //##################
                    //podpunkt c. KONIEC
                    //##################
                }
                echo "<p style='float:left;width: 273px;height:50px; font-size: 130%;text-align:center;margin:0px;'>Wylosowano.</p>";//po prostu dopisek
                
            }
            else{
                echo "<p id='klik'>Proszę kliknąć przycisk</p>";//komunikat o proźbie kliknięcia przyciku zastępujący błąd pustą tablicą POST. program bez tego dalej by działał, ale zawsze na początku
                //pojawiałby się brzydki błąd
            }
            
        ?>
    </form>
</body>
</html>