var RotateAndPauseControl = pc.createScript('rotateAndPauseControl');

// 初始化
RotateAndPauseControl.prototype.initialize = function() {
    this.isRotating = false;  // 初始不旋转
    this.currentSpeed = 0;  // 当前旋转速度
    this.acceleration = 50;  // 持续加速值
    this.initialSpeed = 300;  // 初始旋转速度
    this.maxSpeed = 600;  // 最大旋转速度
    this.rotationDirection = 1;  // 1 为正向，-1 为反向
    this.easing = 0.99;  // 用于减速时的缓动因子
    this.minSpeedThreshold = 0.1;  // 当速度低于这个值时速度减小更明显
    this.bounceFactor = 0.2;  // 反弹系数，控制反弹力度
    this.maxBounces = 1;  // 最大反弹次数（反弹一次后停止）
    this.bounceCount = 0;  // 当前反弹次数

    // 随机生成中奖分数
    this.winningSection = Math.floor(Math.random() * 36) + 1;

    // 监听鼠标按下，设置旋转方向
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, function (event) {
        if (event.button === pc.MOUSEBUTTON_LEFT) {
            this.rotationDirection = 1;  // 左键正向旋转
            this.currentSpeed = this.initialSpeed;  // 初始化速度
            this.isRotating = true;  // 开始旋转
        } else if (event.button === pc.MOUSEBUTTON_RIGHT) {
            this.rotationDirection = -1;  // 右键反向旋转
            this.currentSpeed = this.initialSpeed;  // 初始化速度
            this.isRotating = true;  // 开始旋转
        }
    }, this);

    // 监听鼠标松开事件
    this.app.mouse.on(pc.EVENT_MOUSEUP, function (event) {
        this.isRotating = false;  // 开始减速
        this.bounceCount = 0;  // 重置反弹次数
    }, this);
};

// 每帧更新
RotateAndPauseControl.prototype.update = function(dt) {
    if (this.isRotating) {
        // 持续加速直到最大速度
        this.currentSpeed += this.acceleration * dt;
        if (this.currentSpeed > this.maxSpeed) {
            this.currentSpeed = this.maxSpeed;
        }
    } else {
        // 缓慢减速直到停止，使用指数减速模拟惯性
        if (this.currentSpeed > 0) {
            if (this.currentSpeed < this.minSpeedThreshold) {
                this.currentSpeed *= this.easing * this.easing;  // 当速度很慢时，减速更加明显
            } else {
                this.currentSpeed *= this.easing;  // 正常缓动减速
            }
        }

        // 当速度接近 0 时，添加一次轻微反弹效果，然后完全停止
        if (this.currentSpeed < 5 && this.currentSpeed > 0 && this.bounceCount < this.maxBounces) {
            this.currentSpeed = -this.currentSpeed * this.bounceFactor;  // 轻微反弹
            this.bounceCount += 1;  // 记录反弹次数
        }

        // 在弹性反弹后完全停止，并调用显示中奖结果的函数
        if (this.bounceCount >= this.maxBounces) {
            this.currentSpeed = 0;  // 完全停止
            
            // 调用 resultDisplay.js 中的 onSpinComplete 来显示结果
            console.log("调用 onSpinComplete，中奖结果：", this.winningSection);
            if (typeof window.onSpinComplete === 'function') {
                window.onSpinComplete(this.winningSection);  // 传递中奖分数
            } else {
                console.error("onSpinComplete 未定义！");
            }
        }
    }

    // 根据旋转速度和方向进行旋转
    if (this.currentSpeed !== 0) {
        var rotationStep = this.currentSpeed * dt * this.rotationDirection;
        this.entity.rotate(0, rotationStep, 0);  // 旋转物体
    }
};
