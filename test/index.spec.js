describe("index", function(){
  it("works", function(){
    var resolveArrayOverrides = require("../index")
    var DNA = require("organic").DNA
    var dna = new DNA({
      "default": {
        "value": [1, 2, 3, 4],
        "value2": [
          {key: "1", key2: "2"}
        ],
        "value3": [1,2,3]
      },
      "mode": {
        "default": {
          "value": [{ "$unshift": 0 }, { "$push": 5 }],
          "value2": [{"$merge": {"0": {key3: "3", key: "modified"}}}],
          "value3": [{"$insert": {"1": 1.5}}]
        }
      }
    })
    resolveArrayOverrides(dna, "mode")
    expect(dna.default.value[0]).toBe(0)
    expect(dna.default.value[5]).toBe(5)
    expect(dna.default.value2[0].key).toBe("modified")
    expect(dna.default.value2[0].key3).toBe("3")
    expect(dna.default.value3[1]).toBe(1.5)
  })
})