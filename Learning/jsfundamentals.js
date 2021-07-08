function NBAPlayer (name, gender, height) {
    this.name = name;
    this.gender = gender;
    this.height = height;
}

const jude = new NBAPlayer('Kajura', 'Male', '5inch');

NBAPlayer.prototype.dunk = functiona() {};

so if say carry.dunk().dunkIt will look at the properties directly registered under Carry then go to the protoype.

// ES5 
global.setTimeout(function() {
    console.log("It has been 5 seconds");
}, 5000);

//es6 
global.setTimeout(()=> console.log("it has been 5 seconds"), 5000)

//es6 with multiple lines
global.setTimeout(()=> {
    console.log("it has been 5 seconds")}, 5000)