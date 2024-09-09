// resultDisplay.js

// 动态创建显示中奖结果的 div 元素
function createResultElement() {
    // 创建一个 div 元素
    var resultElement = document.createElement('div');
    resultElement.id = 'result';
    resultElement.style.position = 'absolute';
    resultElement.style.top = '20px';
    resultElement.style.left = '50%';
    resultElement.style.transform = 'translateX(-50%)';
    resultElement.style.fontSize = '24px';
    resultElement.style.fontWeight = 'bold';
    resultElement.style.color = 'green';
    resultElement.style.zIndex = '10'; // 确保它显示在最前端
    resultElement.innerHTML = "等待结果...";
    
    // 将这个 div 添加到页面 body 中
    document.body.appendChild(resultElement);
}

// 调用创建元素的函数，确保页面加载后有显示区域
createResultElement();

// 显示中奖结果
function showWinningScore(winningSection) {
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
