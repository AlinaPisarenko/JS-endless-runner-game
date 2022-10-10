class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1000;
    this.height = 600;

    // this.layerImage11 = document.getElementById('layer11');
    // this.layerImage10 = document.getElementById('layer10');
    // this.layerImage9 = document.getElementById('layer9');
    // this.layerImage8 = document.getElementById('layer8');
    // this.layerImage7 = document.getElementById('layer7');
    this.layerImage6 = document.getElementById('layer6');
    this.layerImage5 = document.getElementById('layer5');
    this.layerImage4 = document.getElementById('layer4');
    this.layerImage3 = document.getElementById('layer3');
    this.layerImage2 = document.getElementById('layer2');
    this.layerImage1 = document.getElementById('layer1');
    this.layerImage0 = document.getElementById('layer0');

    this.layer0 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      this.layerImage0
    );
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      this.layerImage1
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.2,
      this.layerImage2
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.4,
      this.layerImage3
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.6,
      this.layerImage4
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      0.7,
      this.layerImage5
    );
    this.layer6 = new Layer(
      this.game,
      this.width,
      this.height,
      0.8,
      this.layerImage6
    );
    // this.layer7 = new Layer(
    //   this.game,
    //   this.width,
    //   this.height,
    //   0.9,
    //   this.layerImage7
    // );
    // this.layer8 = new Layer(
    //   this.game,
    //   this.width,
    //   this.height,
    //   1,
    //   this.layerImage8
    // );
    // this.layer9 = new Layer(
    //   this.game,
    //   this.width,
    //   this.height,
    //   1.1,
    //   this.layerImage9
    // );
    // this.layer10 = new Layer(
    //   this.game,
    //   this.width,
    //   this.height,
    //   1.2,
    //   this.layerImage10
    // );
    // this.layer11 = new Layer(
    //   this.game,
    //   this.width,
    //   this.height,
    //   1.3,
    //   this.layerImage11
    // );
    this.BackgroundLayers = [
      this.layer0,
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
      this.layer6,
      // this.layer7,
      // this.layer8,
      // this.layer9,
      // this.layer10,
      // this.layer11,
    ];
  }
  update() {
    this.BackgroundLayers.forEach((layer) => {
      layer.update();
    });
  }
  draw(context) {
    this.BackgroundLayers.forEach((layer) => {
      layer.draw(context);
    });
  }
  restart() {
    this.x = 0;
  }
}
