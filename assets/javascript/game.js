$(document).ready(function() {
   
    let characters = [  
        obiWan = {
            'name': 'obiWan',
            'health': 120,
            'multiplier': 10,
            'power': function() {
                return Math.floor(Math.random() * this.multiplier); 
            },
            'attack': function() {} // I eventually want it to read as obiWan.attack(darthmaul) etc.
                
        },
        luke = {
            'name': 'luke',
            'health': 100,
            'multiplier': 10,
            'power': function() {
                return Math.floor(Math.random() * this.multiplier); 
            },
            'attack': function() {} // I eventually want it to read as luke.attack(darthmaul) etc.
                 
        },
        darthSidious = {
            'name': 'darthSidious',
            'health': 150,
            'multiplier': 10,
            'power': function() {
                return Math.floor(Math.random() * this.multiplier); 
            },
            'attack': function() {} // I eventually want it to read as darthSidious.attack(darthmaul) etc.
                 
        },
        darthMaul = {
            'name': 'darthMaul',
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
    let yourCharacter = '';
    let defender = '';
    let enemiesAvailableToAttack = [];
    // let lukeHealth = $('#luke_health').html('<p>' + characters[1].health + '</p>');

    function isJediDead(jedi) {
        if (jedi.health <= 0) {
            return true;
        }
        return false;
    }

    function powerBoost(jedi) {
        this.multiplier = this.multiplier + 5;
        return this;
    }

    // attack two jedi
    function attack(jediOne, jediTwo) {
        let j1Power = jediOne.power();
        let j2Power = jediTwo.power();

        jediOne.health = jediOne.health - j2Power;
        jediTwo.health = jediTwo.health - j1Power;

            // check health
        if (isJediDead(jediOne) === true) {
            alert(jediOne.name + " lost");
        }
        if (isJediDead(jediTwo) === true) {
            alert(jediTwo.name + " lost");
        }

        powerBoost(jediOne);

        $('#yourCharacter-power').html('<p>You attacked ' + jediTwo.name + ' for ' + j1Power + ' damage.' + '</p>');
        $('#defender-power').html('<p>' + jediOne.name + ' attacked you for ' + j2Power + ' damage.' + '</p>');

        if (jediOne.name === 'luke') {
            $('#luke_health').html(jediOne.health);
        }
        else if (jediOne.name === 'obiWan') {
            $('#obiWan_health').html(jediOne.health);
        }
        else if (jediOne.name === 'darthSidious') {
            $('#darthSidious_health').html(jediOne.health);
        }
        else if (jediOne.name === 'darthMaul') {
            $('#darthMaul_health').html(jediOne.health);
        }

        if (jediTwo.name === 'luke') {
            $('#luke_health').html(jediTwo.health);
        }
        else if (jediTwo.name === 'obiWan') {
            $('#obiWan_health').html(jediTwo.health);
        }
        else if (jediTwo.name === 'darthSidious') {
            $('#darthSidious_health').html(jediTwo.health);
        }
        else if (jediTwo.name === 'darthMaul') {
            $('#darthMaul_health').html(jediTwo.health);
        }
        

        console.log("yourCharacter power: " + jediOne.multiplier);
        console.log('Health of ' + yourCharacter.name + ' is ' + jediOne.health);
        console.log('Health of ' + defender.name + ' is ' + jediTwo.health);
    }

    $('#attackBtn').on('click', function() {
        attack(yourCharacter, defender);
    });

    $('.js-character').on('click', function() {
        if (!isFirstCharacterSelected) {
            let chosenCharacter = this.id;
            for (i = 0; i < characters.length; i++) {
                if (characters[i].name == chosenCharacter) {
                    yourCharacter = characters[i];
                }
            }
            $('.js-character').appendTo('#attack-characters');
            $(this).appendTo('#chosen-character');
            isFirstCharacterSelected = true;
            console.log('your chosen character is ' + yourCharacter.name);
        }
        else if (isFirstCharacterSelected && this.id != yourCharacter.name) {
            let chosenCharacter = this.id;
            for (i = 0; i < characters.length; i++) {
                if (characters[i].name == chosenCharacter) {
                    defender = characters[i];
                }
            }
            $(this).appendTo('#defender-character');
            isSecondCharacterSelected = true;
            console.log('your defender is ' + defender.name);
        }
        else {
            alert('went to else');
        }
    });


});
