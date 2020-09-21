import Phaser from 'phaser';

import forest from '../assets/Forest_layer.png';
import run1 from '../assets/Run/Run1.png';
import run2 from '../assets/Run/Run2.png';
import run3 from '../assets/Run/Run3.png';
import run4 from '../assets/Run/Run4.png';
import run5 from '../assets/Run/Run5.png';
import run6 from '../assets/Run/Run6.png';
import run7 from '../assets/Run/Run7.png';
import banana from '../assets/Banana.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('bg', forest);

    this.load.image('run1', run1);
    this.load.image('run2', run2);
    this.load.image('run3', run3);
    this.load.image('run4', run4);
    this.load.image('run5', run5);
    this.load.image('run6', run6);
    this.load.image('run7', run7);

    this.load.image('banana', banana);
  }

  create() {
    this.background = this.add.tileSprite(0, 0, 800, 600, 'bg');
    this.background.setOrigin(0, 0);

    this.anims.create({
      key: 'run',
      frames: [
        { key: 'run1' },
        { key: 'run2' },
        { key: 'run3' },
        { key: 'run4' },
        { key: 'run5' },
        { key: 'run6' },
        { key: 'run7' },
      ],
      frameRate: 10,
      repeat: 1,
    });

    this.player = this.physics.add.sprite(100, 500, 'run1').play('run');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.7);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.bananas = this.physics.add.group({
      key: 'banana',
      repeat: 4,
      setXY: { x: 400, y: 500, stepX: 120 },
    });

    this.physics.add.overlap(
      this.player,
      this.bananas,
      this.collectBanana,
      null,
      this,
    );
  }

  update() {
    if (this.player.x > 650) {
      this.player.setPosition(100, 500);
    }

    if (this.cursors.left.isDown) {
      this.player.setFlip(true, false);
      this.player.setVelocityX(-180);
      this.player.anims.play('run', true);
      this.background.tilePositionX -= 5;
    } else if (this.cursors.right.isDown) {
      this.player.setFlip(false, false);
      this.player.setVelocityX(180);
      this.player.anims.play('run', true);
      this.background.tilePositionX += 5;
    } else if (!this.cursors.right.isDown && !this.cursors.left.isDown) {
      this.player.body.setVelocityX(0);
    }
  }

  collectBanana(player, banana) {
    banana.disableBody(true, true);

    if (this.bananas.countActive(true) === 1) {
      this.bananas.children.iterate((child) => {
        child.enableBody(false, child.x, Phaser.Math.Between(300, 500), true, true);
      });
    }
  }
}
