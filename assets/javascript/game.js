$(document).ready(function() {
   
    let luke = {
        'name': 'luke',
        'health': 200,
        'multiplier': 10,
        'power': function() {
            return Math.floor(Math.random() * this.multiplier); 
        },
        'attack': function() {} // I eventually want it to read as luke.attack(darthmaul) etc.
             
    };

    let darthMaul = {
        'name': 'darth maul',
        'health': 300, 
        'multiplier': 5,
        'power': function() {
            return Math.floor(Math.random() * this.multiplier);
        }, 
    };

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


});
