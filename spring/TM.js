function TM_graph(htmlElement, xAxisLabel, yAxisLabel, yArrayLen){
    this.htmlElement = htmlElement;
    this.xAxisLabel = xAxisLabel;
    this.yAxisLabel = yAxisLabel;
    this.yArrayLen = yArrayLen;
    this.vArray = [];
}
TM_graph.prototype.graphIter = function(x, y){
    this.vArray.push([x, y]);                    // добавляем значение в конец массива
    if (this.vArray.length > this.yArrayLen) this.vArray.shift(); // если в массиве больше yArrayLen значений - удаляем первое
    var xAxisLabel1 = this.xAxisLabel;
    var yAxisLabel1 = this.yAxisLabel;
    var htmlElement1 = this.htmlElement;
    var vArray1 = this.vArray;
    $(function() {
        var options = {
            xaxes: [{axisLabel: xAxisLabel1}],
            yaxes: [{axisLabel: yAxisLabel1}]
        };
        $.plot(htmlElement1, [vArray1], options);  // рисуем график на элементе "vGraph"
    });
};



