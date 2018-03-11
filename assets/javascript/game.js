$(document).ready(function() {
   
    let obiWan = {
        'name': 'obi-wan',
        'health': 120,
        'multiplier': 10,
        'power': function() {
            return Math.floor(Math.random() * this.multiplier); 
        },
        'attack': function() {} // I eventually want it to read as obiWan.attack(darthmaul) etc.
             
    };

    let luke = {
        'name': 'luke',
        'health': 100,
        'multiplier': 10,
        'power': function() {
            return Math.floor(Math.random() * this.multiplier); 
        },
        'attack': function() {} // I eventually want it to read as luke.attack(darthmaul) etc.
             
    };

    let darthSidious = {
        'name': 'darth-sidious',
        'health': 150,
        'multiplier': 10,
        'power': function() {
            return Math.floor(Math.random() * this.multiplier); 
        },
        'attack': function() {} // I eventually want it to read as darthSidious.attack(darthmaul) etc.
             
    };

    let darthMaul = {
        'name': 'darth maul',
        'health': 180, 
        'multiplier': 5,
        'power': function() {
            return Math.floor(Math.random() * this.multiplier);
        }, 
    };

    // Create variables
    let isFirstCharacterSelected = false;
    let yourCharacter = '';
    let enemiesAvailableToAttack = [];

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
        console.log("m " + jediOne.multiplier);

        console.log(jediOne.health);
        console.log(jediTwo.health);
    }

    $('#attackBtn').on('click', function() {
        attack(luke, darthMaul);
    });

    // $('#luke').on('click', function() {
    //         yourCharacter = luke;
    //         isFirstCharacterSelected = true;
    //         enemiesAvailableToAttack = [obiWan, darthSidious, darthMaul];
    //         $('#luke').appendTo('#chosen-character');
    //         $('#obi-wan').appendTo('#attack-characters');
    //         $('#darth-sidious').appendTo('#attack-characters');
    //         $('#darth-maul').appendTo('#attack-characters');
    //         console.log('your character is ' + yourCharacter.name);
    //         console.log('Enemies available to attack are ' + enemiesAvailableToAttack[0].name + ' ' + enemiesAvailableToAttack[1].name + ' ' + enemiesAvailableToAttack[2].name);
    // });

    $('.js-character').on('click', function() {
        if (!isFirstCharacterSelected) {
            // console.log(this.id);
            yourCharacter = this.id;
            $('.js-character').appendTo('#attack-characters');
            $(this).appendTo('#chosen-character');
            isFirstCharacterSelected = true;
            console.log('your character is ' + yourCharacter);
        }
        else {
            alert('2nd character');
        }
    });


});
