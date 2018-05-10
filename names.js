// Dependencies
var fs = require('fs');
var human = require('humanparser');

// Import data
const names = fs.readFileSync('names.txt', 'utf8');

// Declare maps
let firstNameMap = new Map();
let lastNameMap = new Map();
let uniqueFullNameList = [];
let modifiedFullNameList = [];

// Parse Data - filter out empty names
let namesArr = names.split(/\s*[-].*\n.*\s*/).filter(name => name);
namesArr = namesArr.map(line => human.parseName(line));

// Helper functions
incrementMap = function(nameMap, name) {
  nameMap.has(name) ? nameMap.set(name, nameMap.get(name) + 1) : nameMap.set(name, 1);
}
getSortedMap = function(nameMap) {
  return [...nameMap.entries()].sort((a, b) => b[1] - a[1]);
}
checkUniqueFullName = function(fullName) {
  if (!firstNameMap.has(fullName.firstName) && !lastNameMap.has(fullName.lastName)) {
    uniqueFullNameList.push([fullName.lastName, fullName.firstName]);
  }
}
getFirstNUnique = function(n) {
  let uniqueSlice = uniqueFullNameList.slice(0, n)
  uniqueSlice.map((name, i, arr) => {
    modifiedFullNameList.push([arr[i][0], arr[(i + 1) % n][1]])
  });
  return uniqueSlice;
}

// Initialize maps and lists with names
namesArr.map(nameObj => {
  checkUniqueFullName(nameObj);
  incrementMap(firstNameMap, nameObj.firstName);
  incrementMap(lastNameMap, nameObj.lastName);
});

// Output
console.log(`1. Count of unique full names: ${uniqueFullNameList.length}`);
console.log(`2. Count of unique last names: ${lastNameMap.size}`);
console.log(`3. Count of unique first names: ${firstNameMap.size}`);
console.log(`4. The ten most common last names: 
  ${getSortedMap(lastNameMap).slice(0, 10).join('\n  ')}`
);
console.log(`5. The ten most common first names: 
  ${getSortedMap(firstNameMap).slice(0, 10).join('\n  ')}`
);
console.log(`6. 25 completely unique names: 
  ${getFirstNUnique(25).join('\n  ')}`
);
console.log(`7. 25 completely unique modified names: 
  ${modifiedFullNameList.join('\n  ')}`
);



