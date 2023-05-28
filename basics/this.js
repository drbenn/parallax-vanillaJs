// this is the object the function is a property of

// object.method(this) <- 'this' is an argument that refers to the object in which the method/function is contained

// if ran the following in console you would receive 'window'(the browser runtime) as this
function a() {
  console.log(this);
}
a();


const obj = {
  name: 'Billy',
  sing: function() {
    return 'lalala' + this.name;
  }
}

obj.sing()