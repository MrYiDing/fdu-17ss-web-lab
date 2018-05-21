var fresh = function () {
    var childrenNodes = select2.childNodes;
    for (var i = childrenNodes.length - 1;childrenNodes.length>=4;i--){
        select2.removeChild(childrenNodes.item(childrenNodes.length - 1));
    }
    for (var i = 0; i < tables.length;i++){
        var option = document.createElement("option");
        option.text = tables[i].id;
        select2.append(option);
        select2[length].selected = true;
    }
};

var freshAfterDelete = function(){
    select2.remove(document.form2.select2.selectedIndex);
    select2[select2.length - 1].selected = true;
    clearForm2();
    loadTable(tables.length);
};
var deleteTable = function () {
    if(document.form2.select2.selectedIndex === 0){
        tables.pop();
        inputNums.pop();
        divs.pop();
        checkDivs.pop();
        rowNumsOfTable.pop();
        everyTableTrNums.pop();
        select2.remove(select2.getElementsByTagName("option").length - 1);
        select2[select2.length - 1].selected = true;
        clearForm2();
        loadTable(tables.length);
    }else {
        tables.splice(document.form2.select2.selectedIndex-1,1);
        inputNums.splice(document.form2.select2.selectedIndex-1,1);
        everyTableTrNums.splice(document.form2.select2.selectedIndex-1,1);
        divs.splice(document.form2.select2.selectedIndex-1,1);
        checkDivs.splice(document.form2.select2.selectedIndex-1,1);
        rowNumsOfTable.splice(document.form2.select2.selectedIndex-1,1);
        freshAfterDelete();
    }
};



var clearForm2 = function () {
    var childrenNodes = form2.childNodes;
    for (var i = childrenNodes.length - 1;childrenNodes.length>=4;i--){
        form2.removeChild(childrenNodes.item(childrenNodes.length - 1));
    }
};
var clearForm1 = function () {
    var childrenNodes = form1.childNodes;
    for (var i = childrenNodes.length - 1;childrenNodes.length>=7;i--){
        form1.removeChild(childrenNodes.item(childrenNodes.length - 1));
    }
};

var loadTable = function (index) {
    if(index !== 0){
        form2.append(tables[index - 1]);
    }
};
var loadDiv = function(a){
    if(index === 2){
        if(a !== 0){
            form1.append(divs[a-1]);

            form1.append(commit2);
        }
    }
    if(index === 3){
        if(a !== 0){
            form1.append(checkDivs[a-1]);
            form1.append(commit3);
        }
    }
};
select2.onclick = function () {
    clearForm2();
    loadTable(document.form2.select2.selectedIndex);
    indexOfTable = document.form2.select2.selectedIndex;
    if (index === 2 ||index === 3){
        clearForm1();
        loadDiv( document.form2.select2.selectedIndex);
    }
    if (rowNumsOfTable[document.form2.select2.selectedIndex]  !== undefined){
        rowNum = rowNumsOfTable[document.form2.select2.selectedIndex];
    }else {rowNum = 1;}

};


var checkContent = function () {
    if (everyTableTrNums[document.form2.select2.selectedIndex] !== undefined){
    deleteTrNums = everyTableTrNums[document.form2.select2.selectedIndex];
    }else {deleteTrNums.length = 0;}
    console.log(deleteTrNums.length);
    for (var n = 0; n < rowNumsOfTable[document.form2.select2.selectedIndex] - 1; n++ ){
        var deleteTheRow = true;
        var has = true;
        for (var k = 0; k < deleteTrNums.length;k++){
            if (n === deleteTrNums[k]) {
                has = false;
            }

        }
        if (has === true){
            for (var m = 0; m < inputNums[document.form2.select2.selectedIndex -1]; m++){
                var key = document.getElementById("check" + m).value;
                var content = document.getElementById("td"+ document.form2.select2.selectedIndex + (n+1) + m).innerText;
                if(key !== "" || key.length !== 0){
                    if (key !== content){
                        deleteTheRow = false;
                    }
                }
            }
            if (deleteTheRow === true){
                var deleteTr = document.getElementById("tr" + document.form2.select2.selectedIndex + (n+1));
                tables[document.form2.select2.selectedIndex -1].removeChild(deleteTr);
                setColor(document.form2.select2.selectedIndex - 1);
                deleteTrNums.push(n);
                console.log(deleteTrNums);
                everyTableTrNums[document.form2.select2.selectedIndex] = deleteTrNums;
            }

        }
    }
};
var setColor = function (o) {
  var trList = tables[o].getElementsByTagName("tr");
  for (var i = 0; i < trList.length; i++){
      var tdList = trList[i].getElementsByTagName("td");
      if (i % 2 !== 0){
          for (var j = 0; j<tdList.length; j++){
              tdList[j].style.background = "lightgrey";
          }
      }else {
          for (var k = 0; k<tdList.length; k++){
              tdList[k].style.background = "white";
          }
      }
  } 
};

