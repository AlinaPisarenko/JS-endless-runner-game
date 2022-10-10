export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 72;
    this.x = 0;
    this.y = 0;

    this.fontFamily = 'Creepster';
    this.livesImage = document.getElementById('heart');
    this.image = document.getElementById('game-over');
  }
  draw(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = '#ffffff';
    context.shadowBlur = 0;
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColor;
    context.fillText('Score:' + this.game.score, 20, 76);
    context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
    context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 136);
    //lives
    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.livesImage, 36 * i * 1.3 + 1200, 20, 40, 40 );
    }

    //game over
    if (this.game.gameOver) {
      context.textAlign = 'center';
      context.font = this.fontSize * 2 + 'px ' + this.fontFamily;

      if (this.game.score > this.game.winningScore) {
        context.fillText(
          'Woohoo',
          this.game.width * 0.5,
          this.game.height * 0.5 - 20
        );
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText(
          'Congrats!',
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      } else {
        context.drawImage(this.image,this.x,this.y,this.game.width,this.game.height)
        // context.fillText(
        //   'Oh no!',
        //   this.game.width * 0.5,
        //   this.game.height * 0.5 - 20
        // );
        // context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        // context.fillText(
        //   'Good luck next time',
        //   this.game.width * 0.5,
        //   this.game.height * 0.5 + 20
        // );
      }
    }
    context.restore();
  }
}
