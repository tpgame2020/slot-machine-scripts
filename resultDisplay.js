// resultDisplay.js

// 负责显示中奖结果的函数
function showWinningScore(winningSection) {
    // 获取页面上的结果显示元素
    var resultElement = document.getElementById('result');
    
    // 如果元素存在，更新它的内容
    if (resultElement) {
        resultElement.innerHTML = "你中了 " + winningSection + " 分!";
    } else {
        console.log("结果显示区域未找到！");
    }
}

// 当转盘停止后调用该函数并传入中奖分数
function onSpinComplete(winningSection) {
    // 调用显示函数
    showWinningScore(winningSection);
}
