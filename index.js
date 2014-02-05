var resolveArrayOverridesFn = function(namespace, branch, dna){
  for(var key in branch) {
    if(Array.isArray(branch[key])) {
      var shouldRemove = false
      for(var i = 0; i<branch[key].length; i++) {
        if(branch[key][i]["$unshift"] !== undefined) {
          shouldRemove = true
          var arr = dna.selectBranch(namespace+"."+key)
          arr.unshift(branch[key][i]["$unshift"])
        }
        if(branch[key][i]["$push"] !== undefined) {
          shouldRemove = true
          var arr = dna.selectBranch(namespace+"."+key)
          arr.push(branch[key][i]["$push"])
        }
      }
      if(shouldRemove)
        delete branch[key]
    } else
    if(typeof branch[key] == "object") {
      if(namespace != "")
        resolveArrayOverridesFn(namespace+"."+key, branch[key], dna)
      else
        resolveArrayOverridesFn(key, branch[key], dna)
    }
  }
}

module.exports = function(dna, mode, nm) {
  var branch = dna[mode]
  var namespace = nm || ""
  resolveArrayOverridesFn(namespace, branch, dna)
}