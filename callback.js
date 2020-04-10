var clientData = {
  id: 096545,
  fullName: "Not Set",
  //setUsrName是一个在clientData对象中的方法
  setUserName: function (firstName, lastName) {
    this.fullName = firstName + " " + lastName;
  }
}

function getUserInput(firstName, lastName, callback) {
  // code .....
  // 不改变this指向
  callback(firstName, lastName)
  // 使用call改变this指向
  callback.call(this, firstName, lastName);
  // 使用apply改变this指向
  callback.apply(this, [firstName, lastName]);
}
getUserInput("Barack", "Obama", clientData.setUserName);

console.log(clientData.fullName); //不改变this指向: Not Set; 改变this指向：Barack Obama

// console.log(window.fullName); //Barack Obama