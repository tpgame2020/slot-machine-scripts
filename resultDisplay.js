// 创建显示区域
function createResultElement() {
    console.log("创建结果显示区域...");
    var resultElement = document.createElement('div');
    resultElement.id = 'result';
    resultElement.style.position = 'absolute';
    resultElement.style.top = '20px';
    resultElement.style.left = '50%';
    resultElement.style.transform = 'translateX(-50%)';
    resultElement.style.fontSize = '24px';
    resultElement.style.fontWeight = 'bold';
    resultElement.style.color = 'green';
    resultElement.style.zIndex = '10'; 
    resultElement.innerHTML = "等待结果...";
    
    document.body.appendChild(resultElement);
    console.log("结果显示区域创建成功！");
}

// 调用创建函数
createResultElement();

// 显示中奖结果
function showWinningScore(winningSection) {
    var resultElement = document.getElementById('result');
    
    if (resultElement) {
        console.log("找到结果显示区域，正在更新内容...");
        resultElement.innerHTML = "你中了 " + winningSection + " 分!";
    } else {
        console.log("结果显示区域未找到！3333333");
    }
}

// 调用 onSpinComplete
function onSpinComplete(winningSection) {
    console.log("正在调用 onSpinComplete, 中奖分数为:", winningSection);
    showWinningScore(winningSection);
}
