// spinControl.js

var SlotMachine = pc.createScript('slotMachine');

// 初始化
SlotMachine.prototype.initialize = function() {
    this.isSpinning = false;  // 标记是否正在旋转
    this.currentRotation = 0;  // 当前的旋转角度
    this.totalRotation = 0;    // 总旋转角度
    this.targetRotation = 0;   // 目标旋转角度
    this.speed = 1000;         // 初始旋转速度
    this.friction = 2;         // 减速系数
    this.wheelSections = 36;   // 转盘的等分数量
    this.winningSection = 0;   // 用于存储中奖的分数
};

// 开始旋转函数
SlotMachine.prototype.startSpin = function() {
    if (!this.isSpinning) {
        this.isSpinning = true;

        // 生成1到36之间的随机数，确定中奖区域
        this.winningSection = Math.floor(Math.random() * this.wheelSections) + 1;

        // 计算目标旋转角度，例如让转盘转3圈加上落在中奖区域的位置
        var extraRotations = 360 * 3;  // 额外的3圈旋转
        this.targetRotation = extraRotations + (this.winningSection * (360 / this.wheelSections));

        console.log("Winning section:", this.winningSection);
    }
};

// 每帧更新旋转
SlotMachine.prototype.update = function(dt) {
    if (this.isSpinning) {
        // 持续旋转直到达到目标角度
        if (this.currentRotation < this.targetRotation) {
            this.currentRotation += this.speed * dt;
            this.speed -= this.friction;  // 减速效果

            // 限制速度不为负
            if (this.speed < 50) {
                this.speed = 50;  // 最低速度
            }

            this.entity.setEulerAngles(0, this.currentRotation, 0);  // 根据旋转角度旋转物体
        } else {
            // 到达目标，停止旋转
            this.isSpinning = false;
            this.speed = 1000;  // 重置速度
            console.log("Spin stopped at angle:", this.currentRotation);

            // 调用显示中奖结果的函数
            onSpinComplete(this.winningSection);
        }
    }
};
