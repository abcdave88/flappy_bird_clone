// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that wil contain the game
var main_state = {

    preload: function() { 
		// Function called first to load all the assets
    //Change the background color of the game
    this.game.stage.backgroundColor = '#71c5cf';

    //Load the bird sprite
    this.game.load.image('bird', 'assets/bird.png')

    //Load the pipe sprite
    this.game.load.image('pipe', 'assets/pipe.png');
    },

    create: function() { 
    	// Fuction called after 'preload' to setup the game  
      //Displays bird on screen
      this.bird = this.game.add.sprite(100, 245, 'bird');

      //Add gravity to make the bird fall
      this.bird.body.gravity.y= 1000; 

      //call the jump function when the space bar is hit
      var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      space_key.onDown.add(this.jump, this);

      //Create a group of pipes
      this.pipes = game.add.group();
      this.pipes.createMultiple(20, 'pipe')

      //calls add_row_of_pipes function every 1.5 seconds
      this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);
    },
    
    update: function() {
		// Function called 60 times per second
    //if the bird is out the world call restart_game
      if (this.bird.inWorld == false){
        this.restart_game();
      }
    },

    //Make the bird jump
    jump: function(){
    //add vertical velocity to the bird
      this.bird.body.velocity.y = -350;
    },

    //Restart the game
    restart_game: function(){
      //stops timer when game restarts
      this.game.time.events.remove(this.timer);
      //Start the main state which restarts the game
      this.game.state.start('main');
    },

    // By default, all the pipes contained in the group are dead and not displayed. So we pick a dead pipe, display it, and make sure to automatically kill it when it’s no longer visible. This way we never run out of pipes
    add_one_pipe: function(x, y){
      //get the first dead pipe of our group
      var pipe = this.pipes.getFirstDead();

      //set the new position of the pipe
      pipe.reset(x, y);

      //add velocity to the pipe to ake it move left
      pipe.body.velocity.x = 200;

      //kill pipe when no longer visible
      pipe.outOfBoundsKill = true;
    },

    //The previous function displays one pipe, but we need to display 6 pipes in a row with a hole somewhere in the middle
    add_row_of_pipes: function(){
      var hole = Math.floor(Math.random()*5)+1;

      for (var i = 0; i &lt; 8; i++)
        if (i != hole &amp;&amp; i != hole +1)
          this.add_one_pipe(400, i*60+10);
    },
};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 