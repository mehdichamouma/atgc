import {test, dataset, program} from "../models"

export default class TestService {
  static createTest(label, description, datasets, programs) {
    let configurations = []
    var i=0, j=0
    programs.forEach(p => {
      p.versions.forEach(v => {
        v.configurations.forEach(c => {
          console.log(c);
          configurations.push({
            index: j,
            label: c.push,
            programName: p.name,
            versionCode: v.code,
            confId: c._id
          })
          j = j + 1
        })
      })
    })


    let storedDatasets = []
    datasets.forEach(ds => {
      storedDatasets.push({
        index: i,
        datasetId: ds._id,
        title: ds.title,
        withStartTree: false,
      })
      i = i + 1
      ds.starting_trees.forEach(st => {
        storedDatasets.push({
          index: i,
          datasetId: ds._id,
          title: ds.title,
          withStartTree: true,
          startTreeId: st._id,
        })
        i = i + 1
      })
    })
    let results = []
    for (var ik = 0; ik <= i; ik++) {
      for(var jk = 0; jk <= j; jk++) {
        results.push({
          datasetIndex: ik,
          configIndex: jk,
          status: "wait"
        })
      }
    }
    return test.create({
      label: label,
      description: description,
      startedAt: Date.now(),
      configurations,
      datasets: storedDatasets,
      results
    }).then((test) => TestService.createJobs(test._id))

  }

  static createJobs(testId) {
    return test.findOne({_id: testId}).then(t => {
      return program.find({}).then(pgs => {
        t.configurations.forEach(c => {
          let conf = pgs.find(p=>p.name == c.programName)
                        .configurations.find(aConf => aConf._id.equals(c.confId))
          if(conf) {
            t.datasets.forEach(d => {
              let command = d.withStartTree ? conf.startTreeCommand : conf.command
              let startTreeId = d.withStartTree ? conf.startTreeId : null
              let job = {
                datasetId: d.datasetId,
                testId: testId,
                datasetIndex: d.index,
                configIndex: c.index,
                programName: c.programName,
                versionCode: c.versionCode,
                command,
                startTreeId
              }
            })
          }

        })
        return "ok"
      })
    }).catch(e => console.error(e))
  }

  static allTests() {
    return test.find({})
  }
}
