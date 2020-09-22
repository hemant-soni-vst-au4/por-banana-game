import Phaser from 'phaser';

import config from './config/config';
import GameScene from './scenes/gameScene';
import BootScene from './scenes/bootScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}
window.game = new Game();