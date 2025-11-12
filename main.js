const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 500 }, debug: false }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let cursors;
let platforms;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('ground', 'https://i.imgur.com/3fJ1P2b.png'); // placeholder
    this.load.image('block', 'https://i.imgur.com/3fJ1P2b.png');  // placeholder
    this.load.image('player', 'https://i.imgur.com/N5uCbDu.png'); // placeholder
}

function create() {
    // Ground
    platforms = this.physics.add.staticGroup();
    for (let i = 0; i < 50; i++) {
        platforms.create(i * 32, 568, 'ground').setScale(1).refreshBody();
    }

    // Player
    player = this.physics.add.sprite(100, 450, 'player');
    player.setCollideWorldBounds(true);
    player.body.setSize(30, 60); // approx 2 blocks tall

    // Collisions
    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

