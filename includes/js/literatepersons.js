var fs=require('fs')

var filename="../csv/india2011.csv";
var filename1="../csv/indiaSC2011.csv";
var filename2="../../includes/csv/indiaST2011.csv";
var data=fs.readFileSync((filename),'utf8').toString();
var data1=fs.readFileSync((filename1),'utf8').toString();
var data2=fs.readFileSync((filename2),'utf8').toString();
// console.log(data2);
var person;
var j; //column number of Literate - Persons
var k; //column number of Total/ Rural/ Urban
var l; //column number of Age-group
var maindata=data.concat(data1,data2);

var age=["0-6","7","8","9","10","11","12","13","14","15","16","17","18","19","20-24","25-29","30-34","35-39","40-44","45-49","50-54","55-59","60-64","65-69","70-74","75-79","80+"];//array for ages

function csvdata(data){//getting total literate people for the Age-group "7-19"
var lines=data.split("\n");
var headers=lines[0].split(",");
var result=[];
var result1=[];
function colnumber(){ //function for required coloumn numbers
    for(var i=0;i<headers.length;i++)
      {
      if(headers[i]=="Literate - Persons"){
        j=i;
      }
      else if(headers[i]=="Total/ Rural/ Urban") {
        k=i;
      }
      else if(headers[i]=="Age-group"){
      l=i;
      }
    }
};
colnumber();
for(var a=0;a<age.length;a++){
  var personstotal=0;
  	var obj = {};
  //console.log("enter")
  for(var i=1;i<lines.length;i++){
    var currentline=lines[i].split(",");
    if(currentline[k]=="Total" && currentline[l]==age[a]){
        person=currentline[j];
        personstotal=personstotal+parseInt(person);
        //console.log(personstotal);
    }
  }
  obj[headers[l]]=age[a];
  obj[headers[j]]=personstotal.toString();
  result.push(obj);

  //console.log(result);
}
return result;
};
var result1=csvdata(maindata);
console.log(result1);
fs.writeFile("../json/literatepersons.json",JSON.stringify(result1));
