$(document).ready(function() {

    // Create characters
    let characters = [  
        solidSnake = {
            'name': 'solidSnake',
            'health': 120,
            'multiplier': 10,
            'power': function() {
                return Math.floor(Math.random() * this.multiplier); 
            },
            'attack': function() {} // I eventually want it to read as solidSnake.attack(psychoMantis) etc.
                
        },
        grayFox = {
            'name': 'grayFox',
            'health': 100,
            'multiplier': 10,
            'power': function() {
                return Math.floor(Math.random() * this.multiplier); 
            },
            'attack': function() {} // I eventually want it to read as grayFox.attack(psychoMantis) etc.
                 
        },
        sniperWolf = {
            'name': 'sniperWolf',
            'health': 150,
            'multiplier': 10,
            'power': function() {
                return Math.floor(Math.random() * this.multiplier); 
            },
            'attack': function() {} // I eventually want it to read as sniperWolf.attack(psychoMantis) etc.
                 
        },
        psychoMantis = {
            'name': 'psychoMantis',
            'health': 180, 
            'multiplier': 5,
            'power': function() {
                return Math.floor(Math.random() * this.multiplier);
            }, 
        }
    ];

    // Create variables
    let isFirstCharacterSelected = false;
    let isSecondCharacterSelected = false;
    let isThirdCharacterSelected = false;
    let yourCharacter = '';
    let defender = '';  

    // Reset game function
    function restartGame() {
        isFirstCharacterSelected = false;
        isSecondCharacterSelected = false;
        isThirdCharacterSelected = false;
        yourCharacter = '';
        defender = '';
        characters[0].health = 120;
        characters[1].health = 100;
        characters[2].health = 150;
        characters[3].health = 180;
        $('#psychoMantis, #solidSnake, #sniperWolf, #grayFox').css('background-color', 'white');
        $('#psychoMantis, #solidSnake, #sniperWolf, #grayFox').css('color', 'black');
        $('#psychoMantis, #solidSnake, #sniperWolf, #grayFox').css('border-color', 'black');
        $('#psychoMantis, #solidSnake, #sniperWolf, #grayFox').fadeIn('slow');    
        $("#end_game, #yourCharacter-power, #defender-power, #grayFox_health, #solidSnake_health, #sniperWolf_health, #psychoMantis_health").empty();
        $('#solidSnake_health').html(characters[0].health);
        $('#grayFox_health').html(characters[1].health);
        $('#sniperWolf_health').html(characters[2].health);
        $('#psychoMantis_health').html(characters[3].health);
        $('.js-character').appendTo('#start');
    }

    // Function to see if character is dead.
    function isJediDead(jedi) {
        if (jedi.health <= 0) {
            return true;
        }
        return false;
    }

    // Power boost function for character
    function powerBoost(jedi) {
        this.multiplier = this.multiplier + 5;
        return this;
    }

    function clearDamageCount() {
        $("#yourCharacter-power, #defender-power").empty();
    }

    // Attack function
    function attack(jediOne, jediTwo) {
        let j1Power = jediOne.power();
        let j2Power = jediTwo.power();

        jediOne.health = jediOne.health - j2Power;
        jediTwo.health = jediTwo.health - j1Power;

            // check health
        if (isJediDead(jediOne) === true) {
            clearDamageCount();
            $('#end_game').html('<p>You have been defeated...GAME OVER.</p><button class="button pointer restart-button text white" id="restart_game"> Restart Game?</button>');
            $('.js-character').fadeOut('slow');
            alert('You have been defeated...GAME OVER.');
        }
        if (isJediDead(jediTwo) === true) {
            clearDamageCount();
            $('#end_game').html('<p>You win!</p>');
            $('#end_game').html('<p>You have defeated ' + jediTwo.name + ', you can choose to fight another enemy.' + '</p>');
            $('#' + jediTwo.name).fadeOut('slow');
            isSecondCharacterSelected = false;
            alert('You win!');
        }

        $('#restart_game').on('click', function() {
            restartGame();
        });

        powerBoost(jediOne);

        $('#yourCharacter-power').html('<p class="damageUpdate">You attacked ' + jediTwo.name + ' for ' + j1Power + ' damage.' + '</p>');
        $('#defender-power').html('<p class="damageUpdate">' + jediTwo.name + ' attacked you for ' + j2Power + ' damage.' + '</p>');
    

        if (jediOne.name === 'grayFox') {
            $('#grayFox_health').html(jediOne.health);
        }
        else if (jediOne.name === 'solidSnake') {
            $('#solidSnake_health').html(jediOne.health);
        }
        else if (jediOne.name === 'sniperWolf') {
            $('#sniperWolf_health').html(jediOne.health);
        }
        else if (jediOne.name === 'psychoMantis') {
            $('#psychoMantis_health').html(jediOne.health);
        }

        if (jediTwo.name === 'grayFox') {
            $('#grayFox_health').html(jediTwo.health);
        }
        else if (jediTwo.name === 'solidSnake') {
            $('#solidSnake_health').html(jediTwo.health);
        }
        else if (jediTwo.name === 'sniperWolf') {
            $('#sniperWolf_health').html(jediTwo.health);
        }
        else if (jediTwo.name === 'psychoMantis') {
            $('#psychoMantis_health').html(jediTwo.health);
        }

        // console.log("yourCharacter power: " + jediOne.multiplier);
        // console.log('Health of ' + yourCharacter.name + ' is ' + jediOne.health);
        // console.log('Health of ' + defender.name + ' is ' + jediTwo.health);
    }

    // Attack on click event

    $('#attackBtn').on('click', function() {
        attack(yourCharacter, defender);
    });

    // Choose characters

    $('.js-character').on('click', function() {
        if (!isFirstCharacterSelected) {
            let chosenCharacter = this.id;
            for (i = 0; i < characters.length; i++) {
                if (characters[i].name == chosenCharacter) {
                    yourCharacter = characters[i];
                }
            }
            $('.js-character').appendTo('#attack-characters');
            $('.js-character').css('background-color', 'red');
            $(this).appendTo('#chosen-character');
            $(this).css('background-color', 'white');
            isFirstCharacterSelected = true;
            // console.log('your chosen character is ' + yourCharacter.name);
            // console.log('isSecondCharacterSelected is set to: '+ isSecondCharacterSelected);
            // console.log('isFirstCharacterSelected is set to: '+ isFirstCharacterSelected);
        }
        else if (!isSecondCharacterSelected && this.id != yourCharacter.name) {
            let chosenCharacter = this.id;
            for (i = 0; i < characters.length; i++) {
                if (characters[i].name == chosenCharacter) {
                    defender = characters[i];
                }
            }
            $(this).appendTo('#defender-character');
            $(this).css('background-color', 'black');
            $(this).css('color', 'white');
            $(this).css('border-color', 'white');
            // console.log('your defender is ' + defender.name);
            // console.log('isSecondCharacterSelected is set to: '+ isSecondCharacterSelected);
            // console.log('isFirstCharacterSelected is set to: '+ isFirstCharacterSelected);
            isSecondCharacterSelected = true;
        }
        else if (!isThirdCharacterSelected) {
            alert('Character already selected');
        }
        else {
            alert('Character already selected');
        }

    });


});
