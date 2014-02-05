describe("index", function(){
  it("works", function(){
    var resolveArrayOverrides = require("../index")
    var DNA = require("organic").DNA
    var dna = new DNA({
      "default": {
        "value": [1, 2, 3, 4]
      },
      "mode": {
        "default": {
          "value": [{ "$unshift": 0 }, { "$push": 5 }]
        }
      }
    })
    resolveArrayOverrides(dna, "mode")
    expect(dna.default.value[0]).toBe(0)
    expect(dna.default.value[5]).toBe(5)
  })
})