// IIFE - Immediatley Invoked Function Expression - used before es6 modules

// library placed in local scope to avoid namespace collision, () around function prevents hoist in initial parse of js at compile

const solo = (function () {
  console.log('IIFE Invoked');
    function a() {
      return 5;
    }
    return {
      a:a
    }
    // function a() {
    //   return 5
    // }
    // return {
    //   a:a
    // }
})();