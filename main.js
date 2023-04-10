import Player from './player.js';
import InputHandler from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js';
import { UI } from './UI.js';

const canvasBack = document.getElementById('canvas2');
const canvasFront = document.getElementById('canvas3');
const canvas = document.getElementById('canvas1');
const btn = document.getElementById('gooey-button')
const h1 = document.getElementById('title');
const info = document.getElementById('instructions');
const keys = document.getElementById('keys');
const rules = document.getElementById('rules');

window.addEventListener('load', function () {
  let sound = new Audio();
  sound.src = './assets/woods.wav';
  sound.play();

  const ctxBack = canvasBack.getContext('2d');
  canvasBack.width = 1460;
  canvasBack.height = 2400;


  const ctxFront = canvasFront.getContext('2d');
  canvasFront.width = 1460;
  canvasFront.height = 840;


  canvas.width = 1460;
  canvas.height = 840;
  let image = document.getElementById('home-back');
  let imageFront = document.getElementById('home-front');
  ctxBack.drawImage(image, 0,0, canvasBack.width, canvasBack.height)
  ctxFront.drawImage(imageFront, 0,0, canvasFront.width, canvasFront.height)
  btn.addEventListener('click', playMode)
  });


function playMode() {

  canvasBack.style.display = 'none'
  canvasFront.style.display = 'none'
  btn.style.display = 'none';
  h1.style.display = 'none';
  info.style.display = 'none';
  keys.style.display = 'none';
  rules.style.display = 'none'
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 1460;
  canvas.height = 840;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 200;
      this.speed = 0;
      this.maxSpeed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.maxParticles = 50;
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.fontColor = "#c690cf";
      this.time = 0;
      this.winningScore = 40;
      this.maxTime = 30000;
      this.gameOver = false;
      this.lives = 5;
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }
    update(deltaTime) {
      this.time += deltaTime;
      if (this.time > this.maxTime) this.gameOver = true;
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      //handleEnemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
      });
      //handle messages
      this.floatingMessages.forEach((msg) => {
        msg.update();
      });
      //handle particles
      this.particles.forEach((particle, index) => {
        particle.update();
      });
      if (this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles;
      }
      //handle collisions sprites
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      this.particles = this.particles.filter(
        (particle) => !particle.markedForDeletion
      );
      this.collisions = this.collisions.filter(
        (collision) => !collision.markedForDeletion
      );
      this.floatingMessages = this.floatingMessages.filter(
        (msg) => !msg.markedForDeletion
      );
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.particles.forEach((particle) => {
        particle.draw(context);
      });
      this.collisions.forEach((collision) => {
        collision.draw(context);
      });
      this.floatingMessages.forEach((msg) => {
        msg.draw(context);
      });
      this.UI.draw(context);
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5)
        this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
    }
    restart() {
      this.player.restart();
      this.background.restart();
      this.score = 0;
      this.time = 0;
      this.gameOver = false;
      this.lives = 5;
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessages = [];
      animate(0);
    }
  }

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;

  function animate(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameOver) requestAnimationFrame(animate);
  }
  animate(0);
}


  
