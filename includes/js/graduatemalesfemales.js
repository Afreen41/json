var fs=require('fs')

var filename="../csv/india2011.csv";
var filename1="../csv/indiaSC2011.csv";
var filename2="../../includes/csv/indiaST2011.csv";
var data=fs.readFileSync((filename),'utf8').toString();
var data1=fs.readFileSync((filename1),'utf8').toString();
var data2=fs.readFileSync((filename2),'utf8').toString();
// console.log(data2);
var person;
var j; //column number of Educational level - Graduate & above - Males
var k; //column number of Educational level - Graduate & above - Females
var l; //column number of Area Name
var m; //column number of Age-group
var maindata=data.concat(data1,data2);
var statenames=["State - ANDAMAN & NICOBAR ISLANDS","State - ANDHRA PRADESH","State - ARUNACHAL PRADESH","State - ASSAM","State - BIHAR","State - CHHATTISGARH","State - DADRA & NAGAR HAVELI","State - DAMAN & DIU","State - GOA","State - GUJARAT","State - HIMACHAL PRADESH","State - JAMMU & KASHMIR","State - JHARKHAND","State - KARNATAKA","State - KERALA","State - LAKSHADWEEP","State - MADHYA PRADESH","State - MAHARASHTRA","State - MANIPUR","State - MEGHALAYA","State - MIZORAM","State - NAGALAND","State - ODISHA","State - RAJASTHAN","State - SIKKIM","State - TAMIL NADU","State - TRIPURA","State - UTTAR PRADESH","State - UTTARAKHAND","State - WEST BENGAL"];
var ages="All ages";

function csvdata(data){//getting total literate people for the Age-group "7-19"
var lines=data.split("\n");
var headers=lines[0].split(",");
var result=[];
var result1=[];

var result;
function colnumber(){ //function for required coloumn numbers

    for(var i=0;i<headers.length;i++)
      {
      if(headers[i]=="Educational level - Graduate & above - Males"){
        j=i;
      }
      else if(headers[i]=="Educational level - Graduate & above - Females") {
        k=i;
      }
      else if(headers[i]=="Area Name"){
      l=i;
      }
      else if(headers[i]=="Age-group"){
      m=i;
      }
      else if(headers[i]=="Total/ Rural/ Urban"){
      n=i;
      }
    }
};

colnumber();
console.log(j,k);
for(var s=0;s<statenames.length;s++){
  var obj={};
  for(var i=1;i<lines.length;i++){

    var currentline=lines[i].split(",");

// console.log(lines[i]);

  if(currentline[l]==statenames[s] && currentline[m]==ages && currentline[n]=="Total"){
console.log(i,l,j,k );

  obj[headers[l]]=currentline[l];
  obj[headers[j]]=currentline[j];
  obj[headers[k]]=currentline[k];
  //console.log(j,k);

  }
}
result.push(obj);
}
return result;
// console.log(result);
};
var result1=csvdata(maindata);

fs.writeFile("../json/graduatemalefemales.json",JSON.stringify(result1));
