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
    let defeatedCharacters = 0;

    // Reset game function
    function restartGame() {
        isFirstCharacterSelected = false;
        isSecondCharacterSelected = false;
        isThirdCharacterSelected = false;
        yourCharacter = '';
        defeatedCharacters = 0;
        defender = '';
        characters[0].health = 120;
        characters[1].health = 100;
        characters[2].health = 150;
        characters[3].health = 180;
        $('#psychoMantis, #solidSnake, #sniperWolf, #grayFox').css('background-color', 'white');
        $('#psychoMantis, #solidSnake, #sniperWolf, #grayFox').css('color', 'black');
        $('#psychoMantis, #solidSnake, #sniperWolf, #grayFox').css('border-color', 'black');
        $('#psychoMantis, #solidSnake, #sniperWolf, #grayFox').fadeIn('slow'); 
        $('#attackBtn').css('visibility', 'visible');   
        $("#end_game, #yourCharacter-power, #defender-power, #grayFox_health, #solidSnake_health, #sniperWolf_health, #psychoMantis_health").empty();
        $('#solidSnake_health').html(characters[0].health);
        $('#grayFox_health').html(characters[1].health);
        $('#sniperWolf_health').html(characters[2].health);
        $('#psychoMantis_health').html(characters[3].health);
        $('.js-character').appendTo('#start');
    }

    // Function that allows users to add health by clicking on a ration button
    function addRation() {
        $('#ration').css('visibility', 'visible');
    }

    // Function that actually adds health to character
    function rationHealth() {
        yourCharacter.health += 50;
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

    // Function that clears the amount of damage given to fighters
    function clearDamageCount() {
        $("#yourCharacter-power, #defender-power").empty();
    }

    // Attack function
    function attack(jediOne, jediTwo) {
        let j1Power = jediOne.power();
        let j2Power = jediTwo.power();

        jediOne.health = jediOne.health - j2Power;
        jediTwo.health = jediTwo.health - j1Power;


        $('#yourCharacter-power').html('<p class="damageUpdate">You attacked ' + jediTwo.name + ' for ' + j1Power + ' damage.' + '</p>');
        $('#defender-power').html('<p class="damageUpdate">' + jediTwo.name + ' attacked you for ' + j2Power + ' damage.' + '</p>');

            // check health
        if (isJediDead(jediOne) === true) {
            clearDamageCount();
            $('#end_game').html('<p>You have been defeated...GAME OVER.</p><button class="button pointer restart-button text white" id="restart_game"> Restart Game?</button>');
            $('.js-character').fadeOut('slow');
            alert('You have been defeated...GAME OVER.');
        }
        if (isJediDead(jediTwo) === true) {
            clearDamageCount();
            jediOne.health = jediOne.health + 50;
            addRation();
            defeatedCharacters++;
            $('#end_game').html('<p>You win!</p>');
            $('#end_game').html('<p>You have defeated ' + jediTwo.name + ', you can choose to fight another enemy.' + '</p>');
            $('#' + jediTwo.name).fadeOut('slow');
            isSecondCharacterSelected = false;
            alert('You win!');
            if (defeatedCharacters === 3) {
                $('#end_game').html('<p>You have defeated ' + jediTwo.name + ', and won the game!' + '</p><button class="button pointer restart-button text white" id="restart_game">Play again?</button>');
                $('#attackBtn').css('visibility', 'hidden');
                $('#ration').css('visibility', 'hidden');
            }
        }

        $('#restart_game').on('click', function() {
            restartGame();
        });

        powerBoost(jediOne);
    

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

    }

    // Attack on click event

    $('#attackBtn').on('click', function() {
        attack(yourCharacter, defender);
    });

    // Ration on click event, adds health to your character

    $('#ration').on('click', function() {
        rationHealth();
        $('#' + yourCharacter.name + '_health').html(yourCharacter.health);
        $('#ration').css('visibility', 'hidden');
    });

    

    // Choose characters

    $('.js-character').on('click', function() {
        $('#end_game').empty();
        if (!isFirstCharacterSelected) {
            let chosenCharacter = this.id;
            for (i = 0; i < characters.length; i++) {
                if (characters[i].name == chosenCharacter) {
                    yourCharacter = characters[i];
                }
            }
            $('.js-character').appendTo('#attack-characters');
            $('.js-character').css('background-color', '#51B752');
            $(this).appendTo('#chosen-character');
            $(this).css('background-color', 'white');
            isFirstCharacterSelected = true;
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
