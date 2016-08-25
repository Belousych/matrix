function getChar(event) {
    if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) // IE
    }

    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which) // остальные
    }

    return null; // специальная клавиша
}

function Matrix(rows, columns, elem, name, disabled) { // Конструктор матриц
    this.rows = rows; //
    this.columns = columns;
    this.elem = elem;
    this.name = name;
    this.arrState = [];
    if (disabled == false) {
        this.disabled = 'disabled';
    }

    this.init = function() {
        if (elem) {
            this.render(this.elem);
        }
        this.watch();
    }
    this.addRow = function() {
        this.rows++;
        this.render();
    }
    this.delRow = function() {
        this.rows--;
        this.render();
    }
    this.addColumn = function() {
        this.columns++;
        this.render();
    }
    this.delColumn = function() {
        this.columns--;
        this.render();
    }
    this.clear = function() {
        this.arrState = [];
        this.render();
    }
    this.render = function(elem) {
        if (elem) {
            this.elem = elem;
        } else {
            elem = this.elem;
        }
        var rows = this.rows;
        var columns = this.columns;
        var arr = [];
        for (var i = 0; i < rows; i++) {
            arr[i] = [];
            if (this.arrState[i] == undefined) {
                for (var j = 0; j < columns; j++) {
                    arr[i][j] = ''
                }
            } else {
                for (var j = 0; j < columns; j++) {
                    this.arrState[i][j] == undefined ? arr[i][j] = '' : arr[i][j] = this.arrState[i][j]
                }
            }
        }
        this.arrState = arr;

        var elem = document.getElementById(elem);

        var html = '<ul class="matrix-list">';
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < columns; j++) {
                var placeholderI = i + 1;
                var placeholderJ = j + 1;
                html += '<li class="matrix-list__item"><input type="text" value="' + this.arrState[i][j] + '" data-row=' + i + ' data-col=' + j + ' placeholder="' + this.name + placeholderI + ',' + placeholderJ + '" ' + this.disabled + '></li>'
            }
            html += '<li class="clear"></li>'
        }
        html += '</ul>'
        elem.innerHTML = html;
    }
    this.watch = function() {
        var self = this;
        var elem = document.getElementById(this.elem);
        // var input = document.querySelectorAll('input');
        // for (var i = 0; i < input.length; i++) {
        //     input[i].onkeypress = function(e) {
        //         alert('sdfsd');
        //         e = e || event;
        //
        //         if (e.ctrlKey || e.altKey || e.metaKey) return;
        //
        //         var chr = getChar(e);
        //         // с null надо осторожно в неравенствах,
        //         // т.к. например null >= '0' => true
        //         // на всякий случай лучше вынести проверку chr == null отдельно
        //         if (chr == null) return;
        //
        //         if (chr < '0' || chr > '9') {
        //             return false;
        //         }
        //     }
        // }
        // elem.addEventListener('keypress', function(e) {
        //     e = e || event;
        //
        //     if (e.ctrlKey || e.altKey || e.metaKey) return;
        //
        //     var chr = getChar(e);
        //
        //     if (chr == null) return;
        //
        //     if (chr < '0' || chr > '9') {
        //         return false;
        //     } else {
        //         var target = e.target || event.target;
        //         var val = Number(target.value);
        //         var data = target.dataset;
        //         target.value = val;
        //         self.arrState[data.row][data.col] = val;
        //     }
        // });
        elem.addEventListener('input', function(e) {
            var target = e.target || event.target;
            var val = Number(target.value);
            if (isNaN(val)) {
                val = '';
            }
            var data = target.dataset;
            target.value = val;
            self.arrState[data.row][data.col] = val;
        });
    }
    this.init();
}

function multiplicationMatrix(matrixA, matrixB) {
    $body = document.querySelector('body');
    matrixC.rows = matrixA.rows;
    matrixC.columns = matrixB.columns;

    var rowsA = matrixA.rows;
    var colsA = matrixA.columns;
    var rowsB = matrixB.rows;
    var colsB = matrixB.columns;

    var arr = matrixC.arrState;
    if (colsA != rowsB) {
        $body.classList.add('error');
        return false;
    } else {
        for (var i = 0; i < rowsA; i++) arr[i] = [];
        for (var k = 0; k < colsB; k++) {
            for (var i = 0; i < rowsA; i++) {
                var t = 0;
                for (var j = 0; j < rowsB; j++) t += matrixA.arrState[i][j] *  matrixB.arrState[j][k];
                arr[i][k] = t;
            }
        }
        matrixC.arrState = arr;
        matrixC.render();
    }
}

var matrixA = new Matrix(3, 5, 'matrixA', 'a');
var matrixB = new Matrix(5, 4, 'matrixB', 'b');
var matrixC = new Matrix(matrixA.rows, matrixB.columns, 'matrixC', 'c', false);


multiplicationMatrix(matrixA, matrixB);
