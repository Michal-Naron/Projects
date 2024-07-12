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
    <form action="index_z_komentarzem.php" method="post">
        <?php
            for($i=1;$i<11;$i++){
                echo "<input type='numeric' name='w".$i."k1' class='typ1' value=1>";
                echo "<input type='numeric' name='w".$i."k2' class='typ1' value=1>";
                echo "<input type='numeric' name='w".$i."k3' class='typ2' value=2>";
                echo "<input type='numeric' name='w".$i."k4' class='typ2' value=2>";
            }
            
        ?>
        <input type="submit" value="Prześlij" style="width: 200px; height: 50px; font-size: 150%;">
    </form>
    <p id="wynik">&#8594;</p>
    <form action="index_z_komentarzem.php" method="post">
        <?php
            if(!empty($_POST["w1k1"])){
                for($i=1;$i<11;$i++){
                    for($dwa=0;$dwa<2;$dwa++){
                        for($kol=1;$kol<5;$kol++){

                            $rand = (rand(1,4));

                            if($_POST["w".$i."k".$kol]==1){
                                if($_POST["w".$i."k".$rand]==2){
    
                                    $_POST["w".$i."k".$kol]=2;
                                    $_POST["w".$i."k".$rand]=1;
    
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
                    
                    for($wpisz=1;$wpisz<5;$wpisz++){
                        if($_POST["w".$i."k".$wpisz]==1){
                            echo "<input type='numeric' class='typ1' value=".$_POST["w".$i."k".$wpisz].">";
                        }
                        else if($_POST["w".$i."k".$wpisz]==2){
                            echo "<input type='numeric' class='typ2' value=".$_POST["w".$i."k".$wpisz].">";
                        }
                    }
                }
                echo "<p style='float:left;width: 273px;height:50px; font-size: 130%;text-align:center;margin:0px;'>Wylosowano.</p>";
                
            }
            else{
                echo "<p id='klik'>Proszę kliknąć przycisk</p>";
            }
            
        ?>
    </form>
</body>
</html>