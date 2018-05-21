var number = document.getElementById("colNum");
var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");
var select1 = document.getElementById("select1");
var select2 = document.getElementById("select2");

var deleteTrNums = new Array();
var everyTableTrNums = new Array();
var tables = new Array();
var inputNums = new  Array();
//存储每个表格行数 和表格顺序一致
var indexOfTable;
//select2的选项数 0.....
var index;
//select1的选项数 0......
var addDiv;


var f = function (o) {
    o.style.width = "300px";
    o.style.display = "block";
    o.style.margin = "auto";
};
var commit2;

commit2 = document.createElement("input");
commit2.type = "button";
f(commit2);
commit2.value = "Commit";
var checkDiv;
var commit3;
commit3 = document.createElement("input");
commit3.type = "button";
f(commit3);
commit3.value = "Commit";
var commit4;
var num;
var rowNum;
var haveSelect = false;
var rowNumsOfTable = new Array();
var divs = new Array();
var checkDivs = new Array();
//清除form1输入框
var clear = function(){
    var childrenNodes = form1.childNodes;
    for (var i = childrenNodes.length - 1;childrenNodes.length>=7;i--){
        form1.removeChild(childrenNodes.item(childrenNodes.length - 1));
    }
};

select1.onclick = function () {
    index = document.form1.select1.selectedIndex;
    clearForm2();
    loadTable(document.form2.select2.selectedIndex);

    if (index === 1) {
        //初始化create输入框
        haveSelect = false;
        clear();
        document.getElementById("name").value = "";
        document.getElementById("colNum").value="";
        select2[0].selected = true;
        clearForm2();
        number.style.display = "";
        document.getElementById("name").style.display = "";

        number.onkeyup = function () {
            clear();
            var name = document.getElementById("name").value;
            num = number.value;
            for (var i = 0; i < num; i++) {
                var newCol = document.createElement("input");
                newCol.type = "text";
                newCol.placeholder = "Attribute";
                newCol.style.display = "inline";
                newCol.id = "col" + i;
                form1.append(newCol);
            }
            var commit1 = document.createElement("input");
            commit1.type = "button";
            f(commit1);
            commit1.value = "Commit";
            form1.appendChild(commit1);

            commit1.onclick = function () {
                var table = document.createElement("table");
                table.id = name;
               inputNums.push(num);
                tables.push(table);
                fresh();
                indexOfTable = document.form2.select2.selectedIndex;
                select2[select2.length - 1].selected = true;
                var th = document.createElement("th");
                form2.append(table);
                table.append(th);
                table.style.tableLayout = "fixed";
                table.style.width = "600px";

                for (var j = 0; j < num; j++) {
                    var td = document.createElement("td");
                    var colValue = document.getElementById("col" + j).value;
                    td.append(document.createTextNode(colValue));
                    td.style.display = "inline";
                    td.style.width = " 200px";
                    td.style.color = "whitesmoke";
                    td.style.background = "grey";
                    td.style.margin = "0.5em";
                    td.style.width = "10%";
                    th.append(td);
                }


                //形成每个对应的选项输入框 以存div形式保存起来 后方便取出追加
                addDiv = document.createElement("div");
                addDiv.id = "as" + name;
                divs.push(addDiv);
                for (var i = 0; i < inputNums[document.form2.select2.selectedIndex -1]; i++) {
                    var newRow = document.createElement("input");
                    newRow.type = "text";
                    newRow.placeholder = "Attr" + (i+1);
                    newRow.style.display = "inline";
                    newRow.id = "row" + i;
                    addDiv.append(newRow);
                }

                checkDiv = document.createElement("div");
                checkDivs.push(checkDiv);
                for (var k = 0; k < inputNums[document.form2.select2.selectedIndex -1]; k++) {
                    var checkRow = document.createElement("input");
                    checkRow.type = "text";
                    checkRow.placeholder = "Check" + (k+1);
                    checkRow.style.display = "inline";
                    checkRow.id = "check" + k;
                    checkDiv.append(checkRow);
                }

            };
        };
    }
    if (index !== 1) {
        number.style.display = "none";
        document.getElementById("name").style.display = "none";
    }
    if (index === 0){
        clearForm1();
        clearForm2();
        select2[0].selected = true;
    }

    if (index === 2){
            select2[tables.length].selected = true;
            clear();
            clearForm2();
            loadTable(document.form2.select2.selectedIndex);
            clearForm1();
            loadDiv( document.form2.select2.selectedIndex);

        if (rowNumsOfTable[document.form2.select2.selectedIndex]  !== undefined){
            rowNum = rowNumsOfTable[document.form2.select2.selectedIndex];
        }else {rowNum = 1;}


        commit2.onclick = function () {
            var tr = document.createElement("tr");
           tr.id = "tr"+ document.form2.select2.selectedIndex + rowNum;
            tables[document.form2.select2.selectedIndex -1].append(tr);
            for (var j = 0; j < inputNums[document.form2.select2.selectedIndex - 1]; j++) {
                var td = document.createElement("td");
                td.append(document.createTextNode(document.getElementById("row" + j).value));
                td.style.display = "inline";
                td.style.margin = "0.5em";
                td.id = "td" + document.form2.select2.selectedIndex + rowNum + j;
              // if (rowNum % 2 === 0){td.style.background = "lightgrey";}
                tr.append(td);
                setColor(document.form2.select2.selectedIndex - 1);
            }
            rowNum++;
            rowNumsOfTable[document.form2.select2.selectedIndex] = rowNum;

        };
    }
    if (index === 3){
        clear();
        select2[tables.length].selected = true;
        clearForm2();
        loadTable(document.form2.select2.selectedIndex);
        clearForm1();
        loadDiv( document.form2.select2.selectedIndex);

        commit3.onclick = function () {
           checkContent();
           clearForm2();
           loadTable(document.form2.select2.selectedIndex);
        };
    }
    if (index === 4){
        clear();
        select2[tables.length].selected = true;
        clearForm2();
        loadTable(document.form2.select2.selectedIndex);
        clearForm1();
        var p = document.createElement("p");
        p.innerText = "WARNING: You cannot undo this action!";
        form1.append(p);

        commit4 = document.createElement("input");
        commit4.type = "button";
        f(commit4);
        commit4.value = "Commit";
        form1.appendChild(commit4);
        commit4.onclick = function () {
            if(tables.length !== 0){deleteTable();}
        }
    }
};
