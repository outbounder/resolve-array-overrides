# usage

    var resolveArrayOverrides = require("resolve-array-overrides")
    var DNA = require("organic").DNA
    var dna = new DNA({
      default: [1, 2, 3, 4],
      "mode": {
        "default": [{
          "$unshift": 0,
          "$push": 5
        }]
      }
    })
    resolveArrayOverrides(dna, "mode")
    console.log(dna.default); // 0, 1, 2, 3, 4, 5